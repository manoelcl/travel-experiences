import "./index.css";

import Button from "../Button";
import Card from "../Card";

import { useState } from "react";

import arrow from "../../icons/Arrow.svg";

const CardPicker = (size = 5) => {
  const [focusedElement, setFocusedElement] = useState(0);
  const generateCards = (n) => {
    let starsArray = [];
    for (let i = 0; i < n; i++) {
      starsArray.push(<Card key={i}></Card>);
    }
    return starsArray;
  };
  return (
    <div className="card-picker">
      <h2>Staff picks:</h2>
      <Button onClick={() => setFocusedElement((focusedElement - 1) % size)}>
        <img src={arrow}></img>
      </Button>
      <div className="card-container">{generateCards(12)}</div>
      <Button onClick={() => setFocusedElement((focusedElement + 1) % size)}>
        <img src={arrow}></img>
      </Button>
    </div>
  );
};
export default CardPicker;