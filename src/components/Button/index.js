import "./index.css";
import PropTypes from "prop-types";

const Button = ({ callback, text, children }) => {
  return (
    <button className={text ? "button large" : "button"} onClick={callback}>
      {children}
      {text ? text : null}
    </button>
  );
};

Button.propTypes = {
  callback: PropTypes.func,
  text: PropTypes.string,
};

export default Button;
