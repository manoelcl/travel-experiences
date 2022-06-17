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

import { useNavigate, useSearchParams } from "react-router-dom";

import backArrowIcon from "../../icons/BackArrow.svg";
import nearby from "../../icons/Archery.svg";
import Main from "../../components/Main";
import listNearbyService from "../../services/listNearbyService";
import velienceMapIcon from "../../icons/leaflet/velienceMapIcon";
import { latLng } from "leaflet";

function MapEventsComponent({ callbackEvent }) {
  const map = useMapEvents({
    moveend: (e) => {
      const data = calculateDistance();
      callbackEvent(data);
    },
  });

  const calculateDistance = () => {
    const center = map.getCenter();
    const upperlimit = map.getBounds().getNorth();
    const north = latLng(upperlimit, center.lng);
    const distance = center.distanceTo(north) / 500;
    return [center.lat, center.lng, distance];
  };

  return null;
}

export const Nearby = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [center, setCenter] = useState();
  const [experiences, setExperiences] = useState();

  const updateExperiences = async () => {
    console.log(center);

    const results = await listNearbyService({
      lat: center[0],
      lon: center[1],
      distance: center[2],
    });

    if ((results.status = "ok")) {
      setExperiences(results.data);
    }
  };

  useEffect(() => {
    if (!center) return;
    setSearchParams({ lat: center[0], lon: center[1], distance: center[2] });
    const asyncRequest = async () => {
      updateExperiences();
    };
    asyncRequest();
  }, [center]);

  useEffect(() => {
    if (!searchParams.get("lat")) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setCenter([position.coords.latitude, position.coords.longitude, 5]),
        (error) => {
          if (error.code == error.PERMISSION_DENIED) {
            console.log("permission denied");
            setCenter([43.369950538301964, -8.398892283439638, 5]);
          }
        }
      );
    } else {
      setCenter([
        searchParams.get("lat"),
        searchParams.get("lon"),
        searchParams.get("distance"),
      ]);
    }
  }, [useSearchParams]);
  return (
    <>
      <Header cName="nearby">
        <Button callback={() => navigate("/")}>
          <img src={backArrowIcon}></img>
        </Button>
        <Button text="Nearby">
          <img src={nearby} alt="nearby logo" />
        </Button>
        <UserMenu></UserMenu>
      </Header>
      <Main cName="nearby">
        {center ? (
          <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
            <MapEventsComponent
              callbackEvent={(data) => setCenter(data)}
            ></MapEventsComponent>
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
                  <Popup>{experience.title}</Popup>
                </Marker>
              );
            })}
          </MapContainer>
        ) : (
          <p>Geolocating...</p>
        )}
        {experiences ? (
          <CardList cards={experiences}></CardList>
        ) : (
          <div className="card-list">
            <h2>No experiences were found in your area</h2>
          </div>
        )}
      </Main>
    </>
  );
};
