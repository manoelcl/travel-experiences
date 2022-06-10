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
import getExperienceById from "../../services/getExperienceById";
import { useEffect, useState } from "react";

export const Experience = () => {
  let { id } = useParams();
  const [experience, setExperience] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const asyncRequest = async () => {
      const results = await getExperienceById(id);
      console.log(results);
      setExperience(results);
    };
    asyncRequest();
  }, []);

  return (
    <>
      <Header cName="experience">
        <Button callback={() => navigate(-1)}>
          <img src={backArrowIcon}></img>
        </Button>
        <Rating rating={experience ? +experience.average : null}></Rating>
        <UserMenu></UserMenu>
      </Header>
      <Main cName="experience">
        <ButtonsMenu></ButtonsMenu>
        {experience ? (
          <TextCard data={experience}></TextCard>
        ) : (
          <h3>Loading data...</h3>
        )}
      </Main>
      <Background img="http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQ5-2H4TeBVEPxIPsLDJe0cJrjQ0cqNxD3LVomOHg7Phbgv4I8N0-tOqN7Aohtdx82D9xY8S7LM7Rd2pfI1CGo"></Background>
    </>
  );
};
