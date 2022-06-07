import "./index.css";
import PropTypes from "prop-types";
import DateField from "../DateField";
import ProfileSmall from "../ProfileSmall";

const TextCard = ({ title, text }) => {
  return (
    <article className="text-card">
      <h3>Sample text</h3>

      <p>A beach paradise near the center of the town</p>

      <p>Description</p>

      <footer>
        <p>
          Created by <ProfileSmall></ProfileSmall> in
          <DateField timestamp=""></DateField>
        </p>
      </footer>
    </article>
  );
};

TextCard.propTypes = {
  text: PropTypes.object,
};

export default TextCard;
