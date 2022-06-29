import "./index.css";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Rating from "../../components/Rating";
import UserMenu from "../../components/UserMenu";
import Background from "../../components/Background";
import TextCard from "../../components/TextCard";
import Main from "../../components/Main";
import ButtonsMenu from "../../components/ButtonsMenu";

import backArrowIcon from "../../icons/BackArrow.svg";
import { useNavigate, useParams } from "react-router-dom";
import getExperienceByIdService from "../../services/getExperienceByIdService";
import { useContext, useEffect, useState } from "react";
import Comments from "../../components/Comments";
import InteractionBackground from "../../components/InteractionBackground";
import voteExperienceService from "../../services/voteExperienceService";
import { UserContext } from "../../helpers/Context";
import imageAddress from "../../helpers/imageAddress";

import "leaflet/dist/leaflet.css";
import MiniMap from "../../components/MiniMap";
import ErrorAlert from "../../components/ErrorAlert";

export const Experience = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const { token } = useContext(UserContext);
  const [experience, setExperience] = useState();
  const [openSection, setOpenSection] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const asyncRequest = async () => {
      const results = await getExperienceByIdService(id);
      console.log(results);
      setExperience(results);
    };
    asyncRequest();
  }, []);

  const handleVoting = async (userInput) => {
    console.log(userInput);
    const response = await voteExperienceService(id, userInput, token);
    if (response.status === "ok") {
      const results = await getExperienceByIdService(id);
      setExperience(results);
    } else {
      setError(response);
    }
  };

  return (
    <>
      <Header cName="nearby">
        <UserMenu></UserMenu>
        <h1>
          <Button callback={() => navigate(-1)}>
            <img src={backArrowIcon}></img>
          </Button>
          <Rating
            callbackEvent={handleVoting}
            rating={experience ? +experience.average : null}
          ></Rating>
        </h1>
      </Header>
      <Main cName="experience">
        <ButtonsMenu
          callbackEvents={[
            () => setOpenSection("location"),
            () => setOpenSection("comments"),
          ]}
        ></ButtonsMenu>
        {openSection ? (
          <InteractionBackground callbackEvent={() => setOpenSection(null)}>
            {openSection === "comments" ? <Comments id={id} /> : null}
            {openSection === "location" ? (
              <MiniMap center={[experience.lat, experience.lon]} />
            ) : null}
          </InteractionBackground>
        ) : null}
        <ErrorAlert error={error} callbackEvent={() => setError(null)} />
        {experience ? <TextCard data={experience} /> : <h3>Loading data...</h3>}
      </Main>
      <Background
        img={
          experience
            ? imageAddress(experience.photo)
            : "url(http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQ5-2H4TeBVEPxIPsLDJe0cJrjQ0cqNxD3LVomOHg7Phbgv4I8N0-tOqN7Aohtdx82D9xY8S7LM7Rd2pfI1CGo)"
        }
      />
    </>
  );
};
