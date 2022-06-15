import "./index.css";

export const InteractionBackground = ({ children, callbackEvent }) => {
  const clickHandler = (e) => {
    if (e.target === e.currentTarget) {
      callbackEvent();
    }
  };
  return (
    <div onClick={clickHandler} className="interaction-background">
      {children}
    </div>
  );
};
