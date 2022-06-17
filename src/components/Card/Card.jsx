import "./index.css";
import PropTypes from "prop-types";
import Rating from "../Rating";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import imageAddress from "../../helpers/imageAddress";

export const Card = ({ cardData, classSpecial, onclick }) => {
  const navigate = useNavigate();
  let id = cardData.id;
  return (
    <article
      onClick={onclick ? onclick : null}
      className={`card ${classSpecial}`}
    >
      <h3>
        {cardData.title}
        {cardData.distance ? (
          <span>{cardData.distance.toFixed(1)} Km</span>
        ) : null}
      </h3>
      <div
        className="card-background"
        style={{
          backgroundImage: imageAddress(cardData.photo),
        }}
      >
        <p>
          {cardData.abstract}
          {}
        </p>

        <Rating rating={+cardData.average}></Rating>
        <Button callback={() => navigate(`/experience/${id}`)}>+</Button>
      </div>
    </article>
  );
};

Card.propTypes = {
  cardData: PropTypes.object,
};
