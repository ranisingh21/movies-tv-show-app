
import { useState, useEffect } from "react";

const StarRate = ({ movie, onClose, updateRatings = () => {} }) => {
  const [rating, setRating] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [previousRatings, setPreviousRatings] = useState([]);

  useEffect(() => {
    const storedRatings = localStorage.getItem(`ratings-${movie.imdbID}`);
    const ratingsArray = storedRatings ? JSON.parse(storedRatings) : [];

    setPreviousRatings(ratingsArray);

    if (ratingsArray.length > 0) {
      let sum = ratingsArray.reduce((a, b) => a + b, 0);
      let avg = (sum / ratingsArray.length).toFixed(1);
      setAverageRating(avg);
      updateRatings(); 
    } else {
      setAverageRating("No Ratings Yet");
    }

    setRating(null);
  }, [movie.imdbID]);

  return (
    <div className="rating-modal">
      <h2>Rate {movie.Title}</h2>
      <h3>Average Rating: {averageRating}</h3>

      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              cursor: "pointer",
              fontSize: "24px",
              color: star <= (rating || 0) ? "#FFD700" : "grey",
            }}
            onClick={() => {
              if (star === rating) {
                alert("You have already rated this movie.");
                return;
              }

              const updatedRatings = [...previousRatings, star];
              localStorage.setItem(`ratings-${movie.imdbID}`, JSON.stringify(updatedRatings));

              let sum = updatedRatings.reduce((a, b) => a + b, 0);
              let avg = (sum / updatedRatings.length).toFixed(1);
              setAverageRating(avg);
              setPreviousRatings(updatedRatings);
              setRating(star);
              updateRatings(); 
            }}
          >
            ★
          </span>
        ))}
      </div>

      <button  className="closeButton" onClick={onClose}>Close</button>
    </div>
  );
};

export default StarRate;
