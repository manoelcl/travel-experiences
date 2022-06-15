import "./index.css";
import backArrowIcon from "../../icons/BackArrow.svg";
import nearby from "../../icons/Archery.svg";

import { useContext, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import Header from "../../components/Header";
import Main from "../../components/Main";
import UserMenu from "../../components/UserMenu";
import Button from "../../components/Button";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../../helpers/Context";
import postExperienceService from "../../services/postExperienceService";

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
  const [center, setCenter] = useState();
  const [marker, setMarker] = useState([0, -0.09]);
  const [formData, setFormData] = useState({});

  useEffect(
    () =>
      navigator.geolocation.getCurrentPosition((position) =>
        setCenter([position.coords.latitude, position.coords.longitude])
      ),
    []
  );

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    console.log("hellow");
    postExperienceService(data, token);
  };
  return (
    <>
      <Header cName="nearby">
        <Button callback={() => navigate(-1)}>
          <img src={backArrowIcon}></img>
        </Button>
        <Button text="Create Experience">
          <img src={nearby} alt="nearby logo" />
        </Button>
        <UserMenu></UserMenu>
      </Header>
      {myUser ? (
        <Main cName="nearby">
          {center ? (
            <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
              <MapEventsComponent
                event={(data) => setMarker(data)}
              ></MapEventsComponent>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={marker}>
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
              onChange={changeHandler}
              required
            />
            <label htmlFor="abstract">Abstract</label>
            <input
              type="text"
              id="abstract"
              name="abstract"
              placeholder="What makes it unique?"
              autoComplete="off"
              onChange={changeHandler}
              required
            />
            <label htmlFor="content">Content</label>
            <input
              type="text"
              id="content"
              name="content"
              placeholder="A detailed description"
              autoComplete="off"
              onChange={changeHandler}
              required
            />
            <fieldset>
              <input
                type="radio"
                id="travel"
                name="classId"
                value="travel"
                defaultChecked="checked"
                onChange={changeHandler}
              />
              <label htmlFor="travel">Travel</label>

              <input
                type="radio"
                id="experience"
                name="classId"
                value="experience"
                onChange={changeHandler}
              />
              <label htmlFor="experience">Experience</label>
            </fieldset>
            <input type="file" required />
            <Button text="Send"></Button>
          </form>
        </Main>
      ) : (
        <Main cName="nearby">You must be logged in to access this page</Main>
      )}
    </>
  );
};
