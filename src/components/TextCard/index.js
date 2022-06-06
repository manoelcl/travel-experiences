import "./index.css";
import PropTypes from "prop-types";

const TextCard = ({ title, text }) => {
  return (
    <article className="text-card">
      <h3>Sample text</h3>

      <p>A beach paradise near the center of the town</p>
    </article>
  );
};

TextCard.propTypes = {
  text: PropTypes.object,
};

export default TextCard;
