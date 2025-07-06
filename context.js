"use client";
import { createContext, useState, useEffect } from "react";
import movieData from "./movieData.json";

export const MovieDataContext = createContext();

export const MovieDataProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [localMovies, setLocalMovies] = useState([]);
  const [query, setQuery] = useState("ram");
  const [selectedMovie, setSelectedMovie] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [typeFilter, setTypeFilter] = useState("");

  const apiKey = "8d887131";
  const Query = query || "ram";
  const itemsPerPage = 5; // 👈 Change this to 5 per your requirement

  const fetchMovies = async (movieId, page = currentPage, fromPageChange = false) => {
    try {
      if (movieId !== undefined) {
        const cachedMovie = localStorage.getItem(`movie_${movieId}`);
        if (cachedMovie) {
          setSelectedMovie(JSON.parse(cachedMovie));
          return;
        }

        const url = `https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.Response !== "False") {
          setSelectedMovie(data);
          localStorage.setItem(`movie_${movieId}`, JSON.stringify(data));
        }
        return;
      }

      const matchingKey = Object.keys(movieData.results || {}).find(key =>
        key.toLowerCase().includes(Query.toLowerCase())
      );

      const filteredLocal = matchingKey
        ? movieData.results[matchingKey].items.filter(movie =>
            movie.Title.toLowerCase().includes(Query.toLowerCase()) &&
            (!typeFilter || movie.Type === typeFilter)
          )
        : [];2

      if (filteredLocal.length > 0) {
        // Save full list if not from page navigation
        if (!fromPageChange) {
          setLocalMovies(filteredLocal);
          setTotalResults(filteredLocal.length);
          setCurrentPage(1); // reset page if fresh query
        }

        const startIndex = (page - 1) * itemsPerPage;
        const paginatedData = filteredLocal.slice(startIndex, startIndex + itemsPerPage);
        setMovies(paginatedData);
        return;
      }

      // No local result — fallback to API
      let url = `https://www.omdbapi.com/?s=${Query}&apikey=${apiKey}&page=${page}`;
      if (typeFilter) {
        url += `&type=${typeFilter}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "False") {
        setMovies([]);
        setTotalResults(0);
        setLocalMovies([]);
      } else {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults) || 0);
        setLocalMovies(data.Search);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const goToNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchMovies(undefined, nextPage, true);
  };

  const goToPrevPage = () => {
    const prevPage = Math.max(1, currentPage - 1);
    setCurrentPage(prevPage);
    fetchMovies(undefined, prevPage, true);
  };

  useEffect(() => {
    fetchMovies();
  }, [query, typeFilter]);

  return (
    <MovieDataContext.Provider
      value={{
        movies,
        setQuery,
        fetchMovies,
        selectedMovie,
        currentPage,
        totalResults,
        goToNextPage,
        goToPrevPage,
        typeFilter,
        setTypeFilter,
      }}
    >
      {children}
    </MovieDataContext.Provider>
  );
};
