import "./index.css";

import InteractionBackground from "../InteractionBackground";

export const ErrorAlert = ({ error, callbackEvent }) => {
  if (error) {
    return (
      <InteractionBackground callbackEvent={callbackEvent}>
        <div className="error-menu">
          <h2>{error.status}</h2> <p>{error.message}</p>
        </div>
      </InteractionBackground>
    );
  }
};
