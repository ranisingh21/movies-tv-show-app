import React from "react";

const MovieModal = ({ movie, onClose, avgRating }) => {
  return (
    <div className="modalContainer">
      <div className="modalContent">
        <button className="modalButton" onClick={onClose}>
          Close Button
        </button>
        <h2 className="title">{movie.Title}</h2>
        <img className="poster" src={movie.Poster} alt={movie.Title} />
        <div className="plot">{movie.Plot}</div>
        <div className="year">Year: {movie.Year}</div>
        <div className="genre">Genre: {movie.Genre}</div>
        <div className="director">Director: {movie.Director}</div>
        <div className="language">Language: {movie.Language}</div>
        <div className="writer">Writer: {movie.Writer}</div>
        <div className="rating">⭐ Average Rating: {avgRating || "No Ratings Yet"}</div>
      </div>
    </div>
  );
};

export default MovieModal;