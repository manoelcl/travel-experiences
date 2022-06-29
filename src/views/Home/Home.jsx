//CSS
import "./index.css";
//LIBRARIES
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//COMPONENTS
import Header from "../../components/Header";
import Main from "../../components/Main";
import Background from "../../components/Background";
import UserMenu from "../../components/UserMenu";
import Button from "../../components/Button";
import CardPicker from "../../components/CardPicker";
import ErrorAlert from "../../components/ErrorAlert";
//IMAGES
import logo from "../../icons/Velience.svg";
import nearby from "../../icons/Archery.svg";
import explore from "../../icons/Internet.svg";

import getStaffPicksService from "../../services/getStaffPicksService";
import imageAddress from "../../helpers/imageAddress";
import useInterval from "../../hooks/useInterval";

export const Home = () => {
  const [experiences, setExperiences] = useState();
  const [currentCard, setCurrentCard] = useState(0);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const staffPicksRequest = async () => {
    const results = await getStaffPicksService();

    if (results.error) {
      setError(results.error);
    } else {
      setExperiences(results.data);
    }
  };

  useEffect(() => {
    const asyncRequest = async () => {
      staffPicksRequest();
    };
    asyncRequest();
  }, []);

  useInterval(() => {
    setCurrentCard((currentCard + 1) % experiences?.length);
  }, 5000);

  return (
    <>
      <Header>
        <UserMenu />
        <h1>
          <img src={logo} alt="Velience logo" />
          Velience
        </h1>
        <h2>Share your experience!</h2>
        <nav>
          <Button text="Nearby" callback={() => navigate("/nearby")}>
            <img src={nearby} alt="nearby logo" />
          </Button>
          <Button text="Explore" callback={() => navigate("/explore")}>
            <img src={explore} alt="explore logo" />
          </Button>
        </nav>
      </Header>
      <Main>
        <CardPicker
          eventCallback={(num) => setCurrentCard(num)}
          cardsArray={experiences}
          focusedElement={currentCard}
        ></CardPicker>
        <Button color="blue" callback={() => navigate("/create")}>
          +
        </Button>
      </Main>
      <ErrorAlert
        error={error}
        callbackEvent={() => {
          setError(null);
          staffPicksRequest();
        }}
      ></ErrorAlert>
      <Background
        img={
          experiences
            ? imageAddress(experiences[currentCard].photo)
            : "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQ5-2H4TeBVEPxIPsLDJe0cJrjQ0cqNxD3LVomOHg7Phbgv4I8N0-tOqN7Aohtdx82D9xY8S7LM7Rd2pfI1CGo"
        }
      ></Background>
    </>
  );
};
