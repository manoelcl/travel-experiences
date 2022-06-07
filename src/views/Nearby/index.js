import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

import "./index.css";
import "leaflet/dist/leaflet.css";

import Header from "../../components/Header";
import UserMenu from "../../components/UserMenu";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

import backArrowIcon from "../../icons/BackArrow.svg";
import nearby from "../../icons/Archery.svg";

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

const Nearby = () => {
  const navigate = useNavigate();
  const [center, setCenter] = useState();
  const [markers, setMarkers] = useState([
    [0, -0.09],
    [51.505, -0.09],
    [0.505, 100.09],
  ]);

  useEffect(
    () =>
      navigator.geolocation.getCurrentPosition((position) =>
        setCenter([position.coords.latitude, position.coords.longitude])
      ),
    []
  );

  return (
    <>
      <Header cName="nearby">
        <Button callback={() => navigate(-1)}>
          <img src={backArrowIcon}></img>
        </Button>
        <Button text="Nearby" callback={() => navigate("/nearby")}>
          <img src={nearby} alt="nearby logo" />
        </Button>
        <UserMenu></UserMenu>
      </Header>
      {center ? (
        <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
          <MapEventsComponent
            event={(data) => setMarkers([...markers, data])}
          ></MapEventsComponent>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markers.map((value, index) => {
            return (
              <Marker key={index} position={value}>
                <Popup>Marker nº{index}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      ) : (
        <p>Geolocating...</p>
      )}
    </>
  );
};

export default Nearby;
