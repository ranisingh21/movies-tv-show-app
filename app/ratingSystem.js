"use client";
import React, { useState, useEffect } from "react";

const Rating = ({ imdbID, ratings, onRate }) => {
  const [userRating, setUserRating] = useState(0);
  const movieRating = ratings[imdbID] || { average: 0, totalVotes: 0 };

  useEffect(() => {
    setUserRating(0); // Reset user rating on refresh
  }, []); // Only runs once on refresh

  const handleRate = (star) => {
    setUserRating(star);
    onRate(imdbID, star);
  };

  return (
    <div>
      <h3>
        Average Rating:{" "}
        {typeof movieRating.average === "number"
          ? movieRating.average.toFixed(1)
          : "No rating yet"}
      </h3>
      <p>({movieRating.totalVotes || 0} votes)</p>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: "24px",
            cursor: "pointer",
            color: star <= userRating ? "gold" : "gray",
          }}
          onClick={() => handleRate(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
