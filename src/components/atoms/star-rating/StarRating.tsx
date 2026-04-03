import React from "react";
import { FiStar } from "react-icons/fi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 18 }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} size={size} className="text-yellow-400" />);
    } else if (rating >= i - 0.5) {
      stars.push(
        <FaStarHalfAlt key={i} size={size} className="text-yellow-400" />,
      );
    } else {
      stars.push(
        <FaRegStar key={i} size={size} className="text-yellow-400/30" />,
      );
    }
  }

  return <div className="flex items-center gap-0.5">{stars}</div>;
};

export default StarRating;
