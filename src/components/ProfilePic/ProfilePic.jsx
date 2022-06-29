import "./index.css";
import defaultPfp from "../../icons/pfp.webp";
import Button from "../Button";

export const ProfilePic = ({
  username = "default",
  pic = defaultPfp,
  allowed = false,
}) => {
  console.log(pic);

  return (
    <figure className="profile-pic">
      <img src={pic} alt={`${username} profile pic`} />
      {allowed ? (
        <div className="pfp-menu">
          <form>
            <input type="file" id="image"></input>
            <button className="button large">Change photo</button>
          </form>
        </div>
      ) : null}
    </figure>
  );
};
