import "./index.css";
export const DateField = ({ isoDate, dateLength }) => {
  const date = new Date(isoDate);
  return (
    <span className="date-field">
      {dateLength === "long"
        ? date.toLocaleString()
        : date.toLocaleDateString()}
    </span>
  );
};
