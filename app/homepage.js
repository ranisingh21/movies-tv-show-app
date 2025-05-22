import React, { useContext, useEffect, useState } from "react";
import { MovieDataContext } from "./context";
import StarRate from "./ratingSystem";
import MovieModal from "./movieDetails";

const Homepage = () => {
  const { 
    movies, 
    fetchMovies, 
    selectedMovie, 
    currentPage,
    totalResults,
    goToNextPage,
    goToPrevPage
  } = useContext(MovieDataContext);
  
  const [modalContent, setModalContent] = useState(null);
  const [averageRatings, setAverageRatings] = useState({});
  const [localPage, setLocalPage] = useState(1); // for showing 5 per page
  const moviesPerPage = 12;

  const startIndex = (localPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const visibleMovies = movies.slice(startIndex, endIndex);



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

  // Calculate total pages (OMDb API returns 10 results per page)
  const totalPages = Math.ceil(totalResults / 10);

  let content;
  if (movies.length === 0) {
    content = <div className="no-data"> 🚫 Data Not Found</div>;
  } else {
    content = (
      <div className="movie-container">
        {visibleMovies.map((movie) => {
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
            poster = <div className="no-poster"  onClick={() => {
                  fetchMovies(movie.imdbID);
                  setModalContent({ type: "movie", movie });
                }}>Photo Not Available</div>;
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
      <div className="pagination">
        <button 
          onClick={goToPrevPage} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button 
          onClick={goToNextPage} 
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
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