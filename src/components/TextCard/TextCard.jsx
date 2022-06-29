import "./index.css";
import PropTypes from "prop-types";
import DateField from "../DateField";
import ProfileSmall from "../ProfileSmall";

export const TextCard = ({
  data: { title, abstract, content, userId, username, creationDate },
}) => {
  return (
    <article className="text-card">
      <h3>{title}</h3>

      <p>{abstract}</p>

      <p>{content}</p>

      <footer>
        <p>
          Created by <ProfileSmall user={{ userId, username }}></ProfileSmall>{" "}
          in <DateField isoDate={creationDate}></DateField>
        </p>
      </footer>
    </article>
  );
};

TextCard.propTypes = {
  text: PropTypes.object,
};
