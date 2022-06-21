import { useRef } from "react";

import Card from "../Card";
import "./index.css";

export const CardList = ({ cards, selectedId }) => {
  const ref = useRef();

  if (selectedId) {
    const focusedElement = cards.findIndex((card) => card.id === selectedId);
    ref.current?.children[focusedElement]?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
    console.log(focusedElement);
  }

  if (cards && cards.length > 0) {
    return (
      <ul ref={ref} className="card-list">
        {cards.map((card) => (
          <Card
            classSpecial={card.id === selectedId ? "highlighted" : null}
            key={card.id}
            cardData={card}
          ></Card>
        ))}
      </ul>
    );
  } else {
    return null;
  }
};
