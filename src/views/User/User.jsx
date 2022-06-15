import "./index.css";
import backIcon from "../../icons/BackArrow.svg";

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/Header";
import Button from "../../components/Button";
import Main from "../../components/Main";

import getUserData from "../../services/getUserData";
import listExperiences from "../../services/listExperiences";
import { UserContext } from "../../helpers/Context";
import CardList from "../../components/CardList";
import DateField from "../../components/DateField";

export const User = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const { myUser } = useContext(UserContext);

  const [user, setUser] = useState();
  const [userExperiences, setUserExperiences] = useState();

  useEffect(() => {
    const asyncRequest = async () => {
      const request = await getUserData(id);

      setUser(request);
    };
    asyncRequest();
  }, []);

  useEffect(() => {
    const asyncRequest = async () => {
      const request = await listExperiences({ idUser: id });
      console.log(request);
      if (request.status === "ok") {
        setUserExperiences(request.data);
      }
    };
    asyncRequest();
  }, []);
  return (
    <>
      <Header>
        <Button callback={() => navigate(-1)}>
          <img src={backIcon} alt="back icon" />
        </Button>
        <h2>{user ? user.username : "Loading..."}</h2>
      </Header>
      <Main>
        {user ? (
          <>
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
            <h2>Contributions</h2>
            {userExperiences ? (
              <CardList cards={userExperiences}></CardList>
            ) : (
              "no contributions yet"
            )}
          </>
        ) : (
          "loading..."
        )}
      </Main>
    </>
  );
};
