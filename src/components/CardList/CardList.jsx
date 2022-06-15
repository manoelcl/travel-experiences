import Card from "../Card";
import "./index.css";

export const CardList = ({ cards }) => {
  if (cards && cards.length > 0) {
    return (
      <ul className="card-list">
        {cards.map((card) => (
          <Card key={card.id} cardData={card}></Card>
        ))}
      </ul>
    );
  } else {
    return null;
  }
};
