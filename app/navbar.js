import React, { useContext, useState } from "react";
import { MovieDataContext } from "./context";

const Navbar = () => {
  const { setQuery } = useContext(MovieDataContext);
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setQuery(searchTerm); 
  };

  return (
    <nav className="navbar">
      <div className="navbar_tittle">
        <img src="/clapperboard_tiny.png" alt="Clapperboard" />
        <h2>Movies & TV Shows</h2>
      </div>

      <form onSubmit={handleSubmit} className="search-bar-icon">
        <input
          type="text"
          className="search-bar-input"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearch}
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
