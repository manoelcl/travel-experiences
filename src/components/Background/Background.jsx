import "./index.css";
import PropTypes from "prop-types";

export const Background = ({ img }) => {
  console.log(img);
  return (
    <div
      style={{ backgroundImage: img || "none" }}
      className="background"
    ></div>
  );
};

Background.propTypes = {
  img: PropTypes.string,
};
