import "./index.css";
import PropTypes from "prop-types";
import shape from "../../icons/Vector.svg";
import shapeActive from "../../icons/Vector2.svg";

export const Rating = ({ rating, callbackEvent }) => {
  const stars = Math.round(rating);
  const generateStars = () => {
    let starsArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < stars) {
        starsArray.push(
          <img
            key={i}
            onClick={callbackEvent ? () => callbackEvent(i + 1) : null}
            src={shapeActive}
            alt="star"
          ></img>
        );
      } else {
        starsArray.push(
          <img
            key={i}
            onClick={callbackEvent ? () => callbackEvent(i + 1) : null}
            src={shape}
            alt="star"
          ></img>
        );
      }
    }
    return starsArray;
  };

  return <div className={"rating"}>{generateStars()}</div>;
};

Rating.propTypes = {
  rating: PropTypes.number,
};
