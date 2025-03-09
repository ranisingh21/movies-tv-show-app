import { useState } from "react";

const StarRate = ({ movie, onClose }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="rating-modal">
      <h2>Rate {movie.Title}</h2>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => {
          let starColor = "grey";
          if (star <= rating) {
            starColor = "#FFD700";
          }

          return (
            <label key={star} style={{ cursor: "pointer" }}>
              <input
                type="radio"
                name="rate"
                value={star}
                className="hideRadioInput"
                onClick={() => setRating(star)}
              />
              <span className="ratingSize" style={{ color: starColor }}>
                ★
              </span>
            </label>
          );
        })}
      </div>
      <button  className="closeButton" onClick={onClose}>Close</button>
    </div>
  );
};

export default StarRate;


