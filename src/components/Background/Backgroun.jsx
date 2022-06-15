import "./index.css";
import PropTypes from "prop-types";

export const Background = ({ img }) => {
  return (
    <div
      style={{ backgroundImage: `url("${img}")` }}
      className="background"
    ></div>
  );
};

Background.propTypes = {
  img: PropTypes.string.isRequired,
};
