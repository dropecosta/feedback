import React, { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onChange: (rating: number) => void;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseOut = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    onChange(index);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const starNumber = index + 1;
        return (
          <span
            key={index}
            style={{ cursor: "pointer" }}
            onMouseOver={() => handleMouseOver(starNumber)}
            onMouseOut={handleMouseOut}
            onClick={() => handleClick(starNumber)}
          >
            {starNumber <= (hoverRating || rating) ? "★" : "☆"}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating
