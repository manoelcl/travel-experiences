import "./index.css";
import PropTypes from "prop-types";
import Rating from "../Rating";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const Card = ({ cardData }) => {
  const navigate = useNavigate();
  let id = 5;
  return (
    <article className="card">
      <h3>Sample text</h3>
      <div
        className="card-background"
        style={{
          backgroundImage:
            'url("http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQ5-2H4TeBVEPxIPsLDJe0cJrjQ0cqNxD3LVomOHg7Phbgv4I8N0-tOqN7Aohtdx82D9xY8S7LM7Rd2pfI1CGo")',
        }}
      >
        <p>A beach paradise near the center of the town</p>
        <Rating rating={2.5}></Rating>
        <Button callback={() => navigate(`/experience/${id}`)}>+</Button>
      </div>
    </article>
  );
};

Card.propTypes = {
  cardData: PropTypes.object,
};

export default Card;
