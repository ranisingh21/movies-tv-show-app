import { useContext, useState } from "react";
import { MovieDataContext } from "./context";
import MovieModal from "./movieDetails";

const Homepage = () => {
  const { movies, fetchMovies, selectedMovie } = useContext(MovieDataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1 className="heading">Movie List</h1>
      <div className="movie-container">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img
              src={movie.Poster}
              alt={movie.Title}
              onClick={() => {
                fetchMovies(movie.imdbID);
                setIsModalOpen(true);
              }}
            />
          </div>
        ))}
      </div>

      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Homepage;

