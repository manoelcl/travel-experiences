import "./index.css";

import Button from "../Button";
import Card from "../Card";

import { useEffect, useState } from "react";

import arrow from "../../icons/Arrow.svg";

export const CardPicker = ({ cardsArray }) => {
  const [focusedElement, setFocusedElement] = useState(0);

  useEffect(() => {}, [focusedElement]);
  if (!cardsArray) return null;
  return (
    <div className="card-picker">
      <h2>Staff picks:</h2>
      <Button
        onClick={() =>
          setFocusedElement((focusedElement - 1) % cardsArray.length)
        }
      >
        <img src={arrow}></img>
      </Button>
      <div className="card-container">
        {cardsArray.map((card) => (
          <Card key={card.id} cardData={card}></Card>
        ))}
      </div>
      <Button
        onClick={() =>
          setFocusedElement((focusedElement + 1) % cardsArray.length)
        }
      >
        <img src={arrow}></img>
      </Button>
    </div>
  );
};
