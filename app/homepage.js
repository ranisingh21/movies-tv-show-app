import { useContext } from "react";
import { MovieContext } from "./context"; 

function Homepage() {
  const { movies } = useContext(MovieContext);

  if (!movies || movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <>
      <h2>Movie List</h2>
      <div className="movie-container">
      {movies.map((movie) => (
    <div  className="movie-card"
        key={movie.imdbID}>
      <img src={movie.Poster} alt={movie.Title}  />
      <h3>{movie.Title} ({movie.Year})</h3>
      <p>Plot: {movie.Plot}</p>
      <p>Rating:{movie.imdbRating}</p>
    </div>
  ))}
</div>

    </>
  );
}

export default Homepage;