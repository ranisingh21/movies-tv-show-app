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
      const ratingsFromStorage = localStorage.getItem(`ratings-${movie.imdbID}`);
      const parsedRatings = JSON.parse(ratingsFromStorage);
      let storedRatings;
      let sum = 0;

      if (parsedRatings) {
        storedRatings = parsedRatings;
      } else {
        storedRatings = [];
      }

      if (storedRatings.length > 0) {
        sum = storedRatings.reduce((total, rating) => total + rating, 0);
      }

      let avg;
      if (storedRatings.length > 0) {
        avg = (sum / storedRatings.length).toFixed(1);
      } else {
        avg = 0;
      }
      ratings[movie.imdbID] = avg;
    });

    setAverageRatings(ratings);
  };

  useEffect(() => {
    updateAverageRatings();
  }, [movies]);

  let content;
  if (movies.length === 0) {
    content = <div className="no-data"> 🚫 Data Not Found</div>;
  } else {
    content = (
      <div className="movie-container">
        {movies.map((movie) => {
          let poster;
          if (movie.Poster !== "N/A") {
            poster = (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="movie-poster"
                onClick={() => {
                  fetchMovies(movie.imdbID);
                  setModalContent({ type: "movie", movie });
                }}
              />
            );
          } else {
            poster = <div className="no-poster">Photo Not Available</div>;
          }

          return (
            <div key={movie.imdbID} className="movie-card">
              {poster}
              <div className="movie-title">{movie.Title}</div>
              <div className="average">⭐ Avg: {averageRatings[movie.imdbID]}/5</div>
              <button
                className="starButton"
                onClick={() => setModalContent({ type: "rating", movie })}
              >
                ⭐
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <h1 className="heading">Movie List</h1>
      {content}

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