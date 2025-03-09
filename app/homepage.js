import { useContext, useState } from "react";
import { MovieDataContext } from "./context";
import MovieModal from "./movieDetails";
import StarRate from "./ratingSystem";

const Homepage = () => {
  const { movies, fetchMovies, selectedMovie } = useContext(MovieDataContext);
  const [modalContent, setModalContent] = useState(null);

  return (
    <div>
      <h1 className="heading">Movie List</h1>
      <div className="movie-container">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster} alt={movie.Title} onClick={() => {
              fetchMovies(movie.imdbID);
              setModalContent({ type: "movie" });
            }} />
            <h3 className="movie-title">{movie.Title}</h3>
            <button className="starButton" onClick={() => setModalContent({ type: "rating", movie })}>
         ⭐
            </button>
          </div>
        ))}
      </div>

      {modalContent?.type === "movie" && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setModalContent(null)} />
      )}

      {modalContent?.type === "rating" && (
        <StarRate movie={modalContent.movie} onClose={() => setModalContent(null)} />
      )}
    </div>
  );
};

export default Homepage;
