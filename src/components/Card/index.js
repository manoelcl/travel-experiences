import "./index.css";
import PropTypes from "prop-types";
import Rating from "../Rating";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const Card = ({ cardData }) => {
  const navigate = useNavigate();
  let id = cardData.id;
  return (
    <article className="card">
      <h3>{cardData.title}</h3>
      <div
        className="card-background"
        style={{
          backgroundImage:
            'url("http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQ5-2H4TeBVEPxIPsLDJe0cJrjQ0cqNxD3LVomOHg7Phbgv4I8N0-tOqN7Aohtdx82D9xY8S7LM7Rd2pfI1CGo")',
        }}
      >
        <p>{cardData.abstract}</p>
        <Rating rating={+cardData.average}></Rating>
        <Button callback={() => navigate(`/experience/${id}`)}>+</Button>
      </div>
    </article>
  );
};

Card.propTypes = {
  cardData: PropTypes.object,
};

export default Card;
