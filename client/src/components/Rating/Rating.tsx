import React, { useState } from 'react';
import StarFilled from '../../assets/star-filled.svg';
import StarEmpty from '../../assets/star-empty.svg';

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

  const getRatingText = (rating: number): string => {
    switch (rating) {
      case 1:
        return 'Muito má';
      case 2:
        return 'Má';
      case 3:
        return 'Regular';
      case 4:
        return 'Boa';
      case 5:
        return 'Muito boa';
      default:
        return '';
    }
  };

  // return (
  //   <div>
  //     {[...Array(5)].map((_, index) => {
  //       const starNumber = index + 1;
  //       return (
  //         <span
  //         className='star'
  //           key={index}
  //           style={{ cursor: "pointer" }}
  //           onMouseOver={() => handleMouseOver(starNumber)}
  //           onMouseOut={handleMouseOut}
  //           onClick={() => handleClick(starNumber)}
  //         >
  //           {starNumber <= (hoverRating || rating) ? "★" : "☆"}
  //         </span>
  //       );
  //     })}
  //     <div className="rating-legend">{getRatingText(rating)}</div>
  //   </div>
  // );

  // return (
  //   <>
  //     {[...Array(5)].map((_, index) => {
  //       const starNumber = index + 1;
  //       return (
  //         <img
  //           className='star'
  //           key={index}
  //           style={{ cursor: "pointer" }}
  //           onMouseOver={() => handleMouseOver(starNumber)}
  //           onMouseOut={handleMouseOut}
  //           onClick={() => handleClick(starNumber)}
  //           src={starNumber <= (hoverRating || rating) ? StarFilled : StarEmpty}
  //           alt="star"
  //         />
  //       );
  //     })}
  //     <div className="rating-legend">
  //       <div>{getRatingText(rating)}</div>
  //     </div>
  //   </>
  // );

  return (
    <div className="rating">
      <div className="rating-content">
        {[...Array(5)].map((_, index) => {
          const starNumber = index + 1;
          return (
            <img
              className='star'
              key={index}
              style={{ cursor: "pointer" }}
              onMouseOver={() => handleMouseOver(starNumber)}
              onMouseOut={handleMouseOut}
              onClick={() => handleClick(starNumber)}
              src={starNumber <= (hoverRating || rating) ? StarFilled : StarEmpty}
              alt="star"
            />
          );
        })}
      </div>
      <div className="rating-legend">{getRatingText(rating)}</div>
    </div>
  );
};

export default StarRating
