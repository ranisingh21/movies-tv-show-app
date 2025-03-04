import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="icon">
        <img src="/clapperboard_tiny.png" alt="Clapperboard" />
        <h3>Movies & TV Shows</h3>
      </div>

      <div className="search-bar-icon">
        <input
          type="text"
          className="search-bar-input"
          placeholder="Search movies..."
        />
        <button className="search-button">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT75SELy7I8F_vR2KQwSl9kI92TgoGW26UtSA&s"
            alt="Search Icon"
          />
        </button>
      </div>

      <div className="profile">
        <img src="/justuju.png" alt="Profile" />
      </div>
    </nav>
  );
};

export default Navbar;