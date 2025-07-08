import { useState, useEffect } from "react";

const StarRate = ({ movie, onClose, updateRatings }) => {
  const [rating, setRating] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [ratedOnce, setRatedOnce] = useState(false);
  const [storedRatings, setStoredRatings] = useState([]);

  const calculateAverage = (ratings) => {
    if (ratings.length === 0) return "No Ratings Yet";
    const total = ratings.reduce((sum, rating) => sum + rating, 0);
    const average = total / ratings.length;
    return Math.round(average * 10) / 10;
  };

  useEffect(() => {
    const ratings = JSON.parse(localStorage.getItem(`ratings-${movie.imdbID}`)) || [];
    setStoredRatings(ratings);
    setAverageRating(calculateAverage(ratings));
    setRatedOnce(false);
  }, [movie.imdbID]);

  const handleRating = (star) => {
    if (ratedOnce) {
      alert("You have already rated this movie. Refresh to rate again.");
      return;
    }

    const updatedRatings = [...storedRatings, star];
    localStorage.setItem(`ratings-${movie.imdbID}`, JSON.stringify(updatedRatings));

    setStoredRatings(updatedRatings);
    setAverageRating(calculateAverage(updatedRatings));
    setRating(star);
    setRatedOnce(true);
    updateRatings();
  };

  return (
    <div className="rating-modal">
      <h2>Rate {movie.Title}</h2>
      <h3>Average Rating: {averageRating}</h3>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= (rating || 0) ? "highlighted" : ""}`}
            onClick={() => handleRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <button className="closeButton" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default StarRate;
