import "./index.css";
import "leaflet/dist/leaflet.css";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

import Header from "../../components/Header";
import Main from "../../components/Main";
import UserMenu from "../../components/UserMenu";
import Button from "../../components/Button";

import backArrowIcon from "../../icons/BackArrow.svg";
import nearby from "../../icons/Archery.svg";
import velienceMapIcon from "../../icons/leaflet/velienceMapIcon";

import { UserContext } from "../../helpers/Context";
import postExperienceService from "../../services/postExperienceService";
import LoginMenu from "../../components/LoginMenu";

function MapEventsComponent({ event }) {
  const map = useMapEvents({
    click: (e) => {
      console.log(e.latlng);
      event([
        ((e.latlng.lat + 90) % 180) - 90,
        ((e.latlng.lng + 180) % 360) - 180,
      ]);
    },
  });
  return null;
}

export const CreateExperience = () => {
  const navigate = useNavigate();
  const { myUser, token } = useContext(UserContext);
  const [login, setLogin] = useState(false);
  const [center, setCenter] = useState([
    43.369950538301964, -8.398892283439638,
  ]);
  const [marker, setMarker] = useState([
    43.369950538301964, -8.398892283439638,
  ]);

  useEffect(
    () =>
      navigator.geolocation.getCurrentPosition((position) =>
        setCenter([position.coords.latitude, position.coords.longitude])
      ),
    []
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    data.append("lat", marker[0]);
    data.append("lon", marker[1]);
    const response = await postExperienceService(data, token);
    if (response.status === "ok") {
      navigate(`/experience/${response.data}`);
    }
  };

  return (
    <>
      <Header cName="nearby">
        <UserMenu />
        <h1>
          <Button callback={() => navigate(-1)}>
            <img src={backArrowIcon}></img>
          </Button>

          <Button text="Create Experience">
            <img src={nearby} alt="nearby logo" />
          </Button>
        </h1>
      </Header>
      {myUser ? (
        <Main cName="create-experience">
          {center ? (
            <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
              <MapEventsComponent
                event={(data) => setMarker(data)}
              ></MapEventsComponent>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={marker} icon={velienceMapIcon}>
                <Popup>Marker </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <p>Geolocating...</p>
          )}
          <form onSubmit={submitHandler}>
            <label htmlFor="name">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="A cool name"
              autoComplete="off"
              required
            />
            <label htmlFor="abstract">Abstract</label>
            <input
              type="text"
              id="abstract"
              name="abstract"
              placeholder="What makes it unique?"
              autoComplete="off"
              required
            />
            <label htmlFor="content">Content</label>
            <input
              type="text"
              id="content"
              name="content"
              placeholder="A detailed description"
              autoComplete="off"
              required
            />
            <fieldset>
              <input
                type="radio"
                id="travel"
                name="classId"
                value="travel"
                defaultChecked="checked"
              />
              <label htmlFor="travel">Travel</label>

              <input
                type="radio"
                id="experience"
                name="classId"
                value="experience"
              />
              <label htmlFor="experience">Experience</label>
            </fieldset>
            <input type="file" name="photo" required />
            <Button text="Send"></Button>
          </form>
        </Main>
      ) : (
        <Main cName="nearby text-box">
          <section className="text-box">
            <h2>You must be logged in to access this page</h2>
            <Button text="Login" callback={() => setLogin(true)}></Button>
            {login ? <LoginMenu callbackEvent={() => setLogin(false)} /> : null}
          </section>
        </Main>
      )}
    </>
  );
};
