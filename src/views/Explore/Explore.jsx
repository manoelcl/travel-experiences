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
import CardList from "../../components/CardList";

import { useNavigate } from "react-router-dom";

import backArrowIcon from "../../icons/BackArrow.svg";
import exploreIcon from "../../icons/Internet.svg";
import Main from "../../components/Main";
import listNearbyService from "../../services/listNearbyService";
import velienceMapIcon from "../../icons/leaflet/velienceMapIcon";

// function MapEventsComponent({ event }) {
//   const map = useMapEvents({
//     click: (e) => {
//       console.log(e.latlng);
//       event([
//         ((e.latlng.lat + 90) % 180) - 90,
//         ((e.latlng.lng + 180) % 360) - 180,
//       ]);
//     },
//   });
//   return null;
// }

function MapEventsComponent({ event }) {
  const map = useMapEvents({
    moveend: (e) => {
      console.log(map.getCenter());
    },
  });
  return null;
}

export const Explore = () => {
  const navigate = useNavigate();
  const [center, setCenter] = useState();
  const [experiences, setExperiences] = useState();

  useEffect(() => {
    const asyncRequest = async () => {
      const results = await listNearbyService({
        distance: 10,
        lat: 43.3564,
        lon: -8.42566,
      });

      if ((results.status = "ok")) {
        setExperiences(results.data);
      }
    };
    asyncRequest();
  }, []);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        setCenter([position.coords.latitude, position.coords.longitude]),
      (error) => {
        if (error.code == error.PERMISSION_DENIED) {
          console.log("permission denied");
          setCenter([43.369950538301964, -8.398892283439638]);
        }
      }
    );
  }, []);
  return (
    <>
      <Header cName="nearby">
        <Button callback={() => navigate(-1)}>
          <img src={backArrowIcon}></img>
        </Button>
        <Button text="Explore">
          <img src={exploreIcon} alt="nearby logo" />
        </Button>
        <UserMenu></UserMenu>
      </Header>
      <Main cName="nearby">
        {center ? (
          <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
            <MapEventsComponent></MapEventsComponent>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {experiences?.map((experience, index) => {
              return (
                <Marker
                  key={index}
                  position={[experience.lat, experience.lon]}
                  icon={velienceMapIcon}
                >
                  <Popup>Marker nº{index}</Popup>
                </Marker>
              );
            })}
          </MapContainer>
        ) : (
          <p>Geolocating...</p>
        )}
        <form></form>
        {experiences ? <CardList cards={experiences}></CardList> : null}
      </Main>
    </>
  );
};
