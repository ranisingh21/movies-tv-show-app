import React from "react";;

const MovieModal = ({ movie, onClose }) => {
  console.log(movie,"rani")
  return (
    <div className="modalContainer">
      <div className="modalContent">
        <button className="close-button" onClick={onClose}>
          <img className="close-icon" src="https://cdn-icons-png.flaticon.com/512/1828/1828778.png" alt="Close" />
        </button>
        <h2 className="title">{movie.Title}</h2>
         <img className="poster" src={movie.Poster} alt={movie.Title} />
        <p className="plot">{movie.Plot}</p>
        <p className="year">Year: {movie.Year}</p>
        <p className="genre">Genre: {movie.Genre}</p>
        <p className="director">Director: {movie.Director}</p>
        <p className="language">Language: {movie.Language}</p>
        <p className="writer">Writer: {movie.Writer}</p> 
      
      </div>
    </div>
  );
};

export default MovieModal;



