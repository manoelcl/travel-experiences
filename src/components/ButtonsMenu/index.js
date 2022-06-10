import "./index.css";

import Button from "../Button";
import locationIcon from "../../icons/location.svg";
import messageIcon from "../../icons/message.svg";
import shareIcon from "../../icons/send_mail.svg";

import { RWebShare } from "react-web-share";

const ButtonsMenu = () => {
  return (
    <div className="buttons-menu">
      <Button>
        <img src={locationIcon}></img>
      </Button>
      <Button>
        <img src={messageIcon}></img>
      </Button>
      <RWebShare
        data={{
          text: "Amazing experience in this place",
          url: window.location.href,
          title: "Experience",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button className="button">
          <img src={shareIcon}></img>
        </button>
      </RWebShare>
    </div>
  );
};
export default ButtonsMenu;
