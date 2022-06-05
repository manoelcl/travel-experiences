import "./index.css";
import PropTypes from "prop-types";
import shape from "../../icons/Vector.svg";
import shapeActive from "../../icons/Vector2.svg";

const Rating = ({ rating, button }) => {
  const stars = Math.round(rating);
  const generateStars = () => {
    let starsArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < stars) {
        starsArray.push(<img key={i} src={shapeActive} alt="star"></img>);
      } else {
        starsArray.push(<img key={i} src={shape} alt="star"></img>);
      }
    }
    return starsArray;
  };

  return <div className="rating">{generateStars()}</div>;
};

Rating.propTypes = {
  rating: PropTypes.number,
};

export default Rating;
