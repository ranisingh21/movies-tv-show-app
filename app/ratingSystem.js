
import { useState, useEffect } from "react";

const StarRate = ({ movie, onClose, updateRatings }) => {
  const [rating, setRating] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [ratedOnce, setRatedOnce] = useState(false);
  const [storedRatings, setStoredRatings] = useState([]);

  useEffect(() => {
    const ratingsArray = JSON.parse(localStorage.getItem(`ratings-${movie.imdbID}`)) || [];
    setStoredRatings(ratingsArray);

    if (ratingsArray.length > 0) {
      let avg = ratingsArray.reduce((a, b) => a + b, 0) / ratingsArray.length;
      let roundedAvg = (avg * 10 - (avg * 10) % 1) / 10; 
      setAverageRating(roundedAvg);
    } else {
      setAverageRating("No Ratings Yet");
    }

    setRatedOnce(false); 
  }, [movie.imdbID]);

  const handleRating = (star) => {
    if (ratedOnce) {
      alert("You have already rated this movie. Refresh to rate again.");
      return;
    }

    const updatedRatings = [...storedRatings, star];
    localStorage.setItem(`ratings-${movie.imdbID}`, JSON.stringify(updatedRatings));

    let avg = updatedRatings.reduce((a, b) => a + b, 0) / updatedRatings.length;
    let roundedAvg = (avg * 10 - (avg * 10) % 1) / 10; 
    setAverageRating(roundedAvg);
    setStoredRatings(updatedRatings);
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
            style={{ cursor: "pointer", fontSize: "24px", color: star <= (rating || 0) ? "#FFD700" : "grey" }} 
            onClick={() => handleRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <button className="closeButton" onClick={onClose}>Close</button>
    </div>
  );
};

export default StarRate;
