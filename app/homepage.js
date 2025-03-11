

import React, { useContext, useEffect, useState } from "react";
import { MovieDataContext } from "./context";
import StarRate from "./ratingSystem";
import MovieModal from "./movieDetails";

const Homepage = () => {
  const { movies, fetchMovies, selectedMovie } = useContext(MovieDataContext);
  const [modalContent, setModalContent] = useState(null);
  const [averageRatings, setAverageRatings] = useState({});

  const updateAverageRatings = () => {
    const ratings = {};
    movies.forEach((movie) => {
      const storedRatings = JSON.parse(localStorage.getItem(`ratings-${movie.imdbID}`)) || [];
      if (storedRatings.length > 0) {
        const avg = storedRatings.reduce((sum, r) => sum + r, 0) / storedRatings.length;
        ratings[movie.imdbID] = avg.toFixed(1);
      } else {
        ratings[movie.imdbID] = 0;
      }
    });
    setAverageRatings(ratings);
  };

  useEffect(() => {
    updateAverageRatings();
  }, [movies]);

  return (
    <div>
      <h1 className="heading">Movie List</h1>
      <div className="movie-container">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img
              src={movie.Poster}
              onClick={() => {
                fetchMovies(movie.imdbID);
                setModalContent({ type: "movie", movie });
              }}
            />
            <div className="movie-title">{movie.Title}</div>
            <div className="average">⭐ Avg Rating: {averageRatings[movie.imdbID]}/5</div>
            <button
            className="starButton"
              onClick={() =>
                setModalContent({
                  type: "rating",
                  movie,
                })
              }
            >
              ⭐
            </button>
          </div>
        ))}
      </div>

      {modalContent?.type === "movie" && selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          avgRating={averageRatings[selectedMovie.imdbID]}
          onClose={() => setModalContent(null)}
        />
      )}

      {modalContent?.type === "rating" && modalContent.movie && (
        <div className="rating-modal">
          <StarRate
            movie={modalContent.movie}
            updateRatings={updateAverageRatings} 
            onClose={() => {
              setModalContent(null);
              updateAverageRatings(); 
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Homepage;
