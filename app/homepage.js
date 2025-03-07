import { useContext } from "react";
import {  MovieDataContext } from "./context"


function Homepage() {
  const { movies } = useContext( MovieDataContext);

  if (!movies || movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <>
      <h2>Movie List</h2>
      <div className="movie-container">
  {movies.map((movie) => (
    <div key={movie.imdbID} className="movie-card">
      <img src={movie.Poster} alt={movie.Title}  />
      <h3>{movie.Title} ({movie.Year})</h3>
    </div>
  ))}
</div>
    </>
  );
}

export default Homepage;
