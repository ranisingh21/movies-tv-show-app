import React, { useContext } from "react";
import { MovieDataContext } from "./context";

const Navbar = () => {
  const { setQuery, setTypeFilter } = useContext(MovieDataContext);

  return (
    <nav className="navbar">
      <div className="navbar_title">
        <img src="/clapperboard_tiny.png" alt="Clapperboard" />
        <h2>Movies & TV Shows</h2>
      </div>

      {/* Search bar and filter in one div */}
      <div className="search-filter-container">
        <form className="search-bar-icon">
          <input
            type="text"
            name="search"
            className="search-bar-input"
            placeholder="Search movies..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT75SELy7I8F_vR2KQwSl9kI92TgoGW26UtSA&s"
              alt="Search Icon"
            />
          </button>
        </form>

        <select
          className="type-filter-dropdown"
          onChange={(e) => setTypeFilter(e.target.value)}
          defaultValue=""
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
