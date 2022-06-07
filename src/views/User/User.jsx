import "./index.css";

import backIcon from "../../icons/BackArrow.svg";

import Header from "../../components/Header";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export const User = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header>
        <Button callback={() => navigate(-1)}>
          <img src={backIcon} alt="back icon" />
        </Button>
        <h2>Profile</h2>
      </Header>
    </>
  );
};
