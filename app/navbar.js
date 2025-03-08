import React, { useContext } from "react";
import { MovieDataContext } from "./context";

const Navbar = () => {
  const { setQuery } = useContext(MovieDataContext);

  return (
    <nav className="navbar">
      <div className="navbar_title">
        <img src="/clapperboard_tiny.png" alt="Clapperboard" />
        <h2>Movies & TV Shows</h2>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(e.target.search.value);
        }}
        className="search-bar-icon"
      >
        <input
          type="text"
          name="search"
          className="search-bar-input"
          placeholder="Search movies..."
        />
        <button type="submit" className="search-button">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT75SELy7I8F_vR2KQwSl9kI92TgoGW26UtSA&s"
            alt="Search Icon"
          />
        </button>
      </form>

      <div className="profile">
        <img src="/justuju.png" alt="Profile" />
      </div>
    </nav>
  );
};

export default Navbar;
