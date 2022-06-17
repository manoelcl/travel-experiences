import "./index.css";

import Background from "../../components/Background";
import Button from "../../components/Button";
import logo from "../../icons/Velience.svg";
import nearby from "../../icons/Archery.svg";
import explore from "../../icons/Internet.svg";
import Header from "../../components/Header";
import Main from "../../components/Main";
import UserMenu from "../../components/UserMenu";
import CardPicker from "../../components/CardPicker";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getStaffPicks from "../../services/getStaffPicks";
import imageAddress from "../../helpers/imageAddress";

export const Home = () => {
  const [experiences, setExperiences] = useState();
  const [currentCard, setCurrentCard] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const asyncRequest = async () => {
      const results = await getStaffPicks();
      setExperiences(results);
    };
    asyncRequest();
  }, []);

  return (
    <>
      <Header>
        <UserMenu></UserMenu>
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
        ></CardPicker>
        <Button color="blue" callback={() => navigate("/create")}>
          +
        </Button>
      </Main>
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
