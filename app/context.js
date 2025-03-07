"use client"

import { createContext, useState, useEffect } from "react";

export const MovieDataContext = createContext();

export const MovieDataProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("avenger"); 
  const apiKey = "8d887131";

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const res = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
        const data = await res.json();
        setMovies(data.Search || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchMovieData();
  }, [query]);

  return (
    <MovieDataContext.Provider value={{ movies, setQuery }}>
      {children}
    </MovieDataContext.Provider>
  );
};