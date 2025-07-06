
import React, { useContext, useState } from "react";
import { MovieDataContext } from "./context";

import movieData from "./movieData.json";


const Navbar = () => {
  const { setQuery, setTypeFilter, localMovies } = useContext(MovieDataContext);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

const handleChange = (e) => {
  const value = e.target.value;
  setInputValue(value);
  setQuery(value);

  if (!value) {
    setSuggestions([]);
    return;
  }

  const suggestionsArray = [];

  Object.keys(movieData.results).forEach((key) => {
    const movies = movieData.results[key].items;
    movies.forEach((movie) => {
      if (
        movie.Title.toLowerCase().includes(value.toLowerCase()) &&
        !suggestionsArray.find((m) => m.imdbID === movie.imdbID)
      ) {
        suggestionsArray.push(movie);
      }
    });
  });

  setSuggestions(suggestionsArray.slice(0, 10));
};


const handleSuggestionClick = (title) => {
  setInputValue(title);
  setQuery(title);
  setSuggestions([]);
};

  return (
    <nav className="navbar">
      <div className="navbar_title">
      <img src="/clapperboard_tiny.png" alt="Clapperboard" />
      <h2>Movies & TV Shows</h2>
    </div>

      <div className="search-filter-container" >
        <form
          className="search-bar-icon"
          onSubmit={(e) => {
            e.preventDefault();
      
          }}
          style={{ position: "relative" }}
        >
          <input
            type="text"
            name="search"
            className="search-bar-input"
            placeholder="Search movies..."
            value={inputValue}
            onChange={handleChange}
            autoComplete="off"
      
          />
          <button type="submit" className="search-button">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT75SELy7I8F_vR2KQwSl9kI92TgoGW26UtSA&s"
              alt="Search Icon"
            />
          </button>

          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <ul
              className="suggestions-list"
              
            >
              {suggestions.map((movie) => (
                <li
                  key={movie.imdbID}
                  onClick={() => handleSuggestionClick(movie.Title)}
                 
                  onMouseDown={(e) => e.preventDefault()} // Prevent input blur on click
                >
                  {movie.Title} ({movie.Year})
                </li>
              ))}
            </ul>
          )}
        </form>

        <select
          className="type-filter-dropdown"
          onChange={(e) => setTypeFilter(e.target.value)}
          defaultValue=""
          style={{ marginLeft: "12px", padding: "6px" }}
        >
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
      </div>

      <div className="profile">
        <img src="/justuju.png" alt="Profile" />
      </div>
    </nav>
  );
};

export default Navbar;

