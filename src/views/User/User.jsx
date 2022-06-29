import "./index.css";
import backIcon from "../../icons/BackArrow.svg";

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/Header";
import Button from "../../components/Button";
import Main from "../../components/Main";

import getUserDataService from "../../services/getUserDataService";
import { UserContext } from "../../helpers/Context";
import CardList from "../../components/CardList";
import DateField from "../../components/DateField";
import listExperiencesByUserIdService from "../../services/listExperiencesByUserIdService";
import UserMenu from "../../components/UserMenu";
import ProfilePic from "../../components/ProfilePic";

export const User = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const { myUser } = useContext(UserContext);

  const [user, setUser] = useState();
  const [userExperiences, setUserExperiences] = useState();

  useEffect(() => {
    const asyncRequest = async () => {
      const request = await getUserDataService(id);

      setUser(request);
    };
    asyncRequest();
  }, []);

  useEffect(() => {
    const asyncRequest = async () => {
      const request = await listExperiencesByUserIdService(id);

      if (request.status === "ok") {
        setUserExperiences(request.data);
      }
    };
    asyncRequest();
  }, []);

  return (
    <>
      <Header cName={"nearby"}>
        <UserMenu />
        <h1 style={{ fontSize: "1.5rem" }}>
          <Button callback={() => navigate(-1)}>
            <img src={backIcon} alt="back icon" />
          </Button>
          {user ? user.username : "Loading..."}
        </h1>
      </Header>
      <Main cName="user-profile">
        {user ? (
          <>
            <ProfilePic></ProfilePic>
            <section>
              <h2>Contact</h2>
              <a email="true" href={`mailto:${user.email}`}>
                {user.email}
              </a>

              <h2>Statistics</h2>
              <p>
                User registered:{" "}
                <DateField isoDate={user.creation_date} dateLength="long" />
              </p>
              <p>User role: {user.role}</p>
            </section>
            <section className="cards-section">
              <h2>Contributions</h2>
              {userExperiences ? (
                <CardList cards={userExperiences}></CardList>
              ) : (
                "no contributions yet"
              )}
            </section>
          </>
        ) : (
          "loading..."
        )}
      </Main>
    </>
  );
};
