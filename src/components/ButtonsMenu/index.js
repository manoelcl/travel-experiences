import Button from "../Button";
import locationIcon from "../../icons/location.svg";
import messageIcon from "../../icons/message.svg";
import shareIcon from "../../icons/send_mail.svg";

const ButtonsMenu = () => {
  return (
    <div className="buttons-menu">
      <Button>
        <img src={locationIcon}></img>
      </Button>
      <Button>
        <img src={messageIcon}></img>
      </Button>
      <Button>
        <img src={shareIcon}></img>
      </Button>
    </div>
  );
};
export default ButtonsMenu;
