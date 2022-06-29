import "./index.css";

import Button from "../Button";
import Card from "../Card";

import { useEffect, useRef, useState } from "react";

import arrow from "../../icons/Arrow.svg";

export const CardPicker = ({ cardsArray, eventCallback, focusedElement }) => {
  const ref = useRef();

  useEffect(() => {
    if (eventCallback) eventCallback(focusedElement);
    ref.current?.children[focusedElement]?.scrollIntoView({
      inline: "center",
      behavior: "smooth",
    });
  }, [focusedElement]);

  if (!cardsArray) return null;

  return (
    <div className="card-picker">
      <h2>Staff picks:</h2>
      <Button
        callback={() =>
          eventCallback(
            (cardsArray.length + focusedElement - 1) % cardsArray.length
          )
        }
      >
        <img src={arrow}></img>
      </Button>
      <div ref={ref} className="card-container">
        {cardsArray.map((card, index) => (
          <Card
            onclick={() => eventCallback(index)}
            key={card.id}
            cardData={card}
            classSpecial={index === focusedElement ? "highlighted" : null}
          ></Card>
        ))}
      </div>
      <Button
        callback={() => {
          console.log("pulsado");
          eventCallback((focusedElement + 1) % cardsArray.length);
        }}
      >
        <img src={arrow}></img>
      </Button>
    </div>
  );
};
