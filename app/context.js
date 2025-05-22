"use client";
movies.json

import { createContext, useState, useEffect } from "react";

export const MovieDataContext = createContext();

export const MovieDataProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("ram");
  const [selectedMovie, setSelectedMovie] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [typeFilter, setTypeFilter] = useState("");

  const apiKey = "8d887131";
  const Query = query || "ram";

  const fetchMovies = async (movieId, page = currentPage) => {
    try {
      let url;
      if (movieId !== undefined) {

        const cachedMovie = localStorage.getItem(`movie_${movieId}`);
        if (cachedMovie) {
          setSelectedMovie(JSON.parse(cachedMovie));
          return;
        }

        url = `https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`;
        
  
      } else {
        url = `https://www.omdbapi.com/?s=${Query}&apikey=${apiKey}&page=${page}`;
        if (typeFilter) {
          url += `&type=${typeFilter}`; 
        }
      }
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "False") {
        setMovies([]);
        setTotalResults(0);
      } else {
        if (movieId) {
          setSelectedMovie(data);
          localStorage.setItem(`movie_${movieId}`, JSON.stringify(data));
        } else {
          setMovies(data.Search);
          setTotalResults(parseInt(data.totalResults) || 0);
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const goToNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchMovies(undefined, nextPage);
  };

  const goToPrevPage = () => {
    const prevPage = Math.max(1, currentPage - 1);
    setCurrentPage(prevPage);
    fetchMovies(undefined, prevPage);
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
      setTypeFilter 
    }}
    >
      {children}
    </MovieDataContext.Provider>
  );
};