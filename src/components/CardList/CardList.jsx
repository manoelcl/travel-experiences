import Card from "../Card";
import "./index.css";

export const CardList = ({ cards = [0, 0, 0, 0, 0] }) => {
  return (
    <ul className="card-list">
      {cards.map((card) => (
        <Card />
      ))}
    </ul>
  );
};
