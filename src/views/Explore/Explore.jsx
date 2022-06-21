import "./index.css";
import "leaflet/dist/leaflet.css";

import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { latLng } from "leaflet";

import Header from "../../components/Header";
import UserMenu from "../../components/UserMenu";
import Button from "../../components/Button";
import CardList from "../../components/CardList";

import backArrowIcon from "../../icons/BackArrow.svg";
import exploreIcon from "../../icons/Internet.svg";
import Main from "../../components/Main";
import listNearbyService from "../../services/listNearbyService";
import velienceMapIcon from "../../icons/leaflet/velienceMapIcon";
import velienceMapIconRed from "../../icons/leaflet/velienceMapIconRed";
import listExperiences from "../../services/listExperiences";

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

export const Explore = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [center, setCenter] = useState([35, 0, 2000]);
  const [experiences, setExperiences] = useState();
  const [searchLocation, setSearchLocation] = useState([35, 0]);
  const [currentExperience, setCurrentExperience] = useState();
  const formRef = useRef();

  const updateExperiences = async () => {
    const params = new FormData(formRef.current);

    const classArray = [];
    const search = new URLSearchParams();

    if (params.get("experience") === "on") classArray.push("experience");
    if (params.get("travel") === "on") classArray.push("travel");
    console.log(classArray);
    if (classArray.length === 1) {
      search.append("classId", classArray[0]);
    }

    search.append("lat", searchLocation[0]);
    search.append("lon", searchLocation[1]);
    search.append("distance", params.get("distance"));

    const queryString = search.toString();
    console.log(queryString);
    const results = await listExperiences(queryString);
    if ((results.status = "ok")) {
      setExperiences(results.data);
    } else {
      console.log(results.response);
    }
  };

  useEffect(() => {
    const asyncRequest = async () => {
      updateExperiences();
    };
    asyncRequest();
  }, [searchLocation]);

  useEffect(() => {
    if (!searchParams) return;
    setCenter([
      searchParams.get("lat"),
      searchParams.get("lon"),
      searchParams.get("distance"),
    ]);
  }, [useSearchParams]);

  return (
    <>
      <Header cName="nearby">
        <UserMenu></UserMenu>
        <h1>
          <Button callback={() => navigate(-1)}>
            <img src={backArrowIcon}></img>
          </Button>
          <Button text="Explore">
            <img src={exploreIcon} alt="nearby logo" />
          </Button>
        </h1>
      </Header>

      <Main cName="nearby">
        {center ? (
          <MapContainer center={center} zoom={2} scrollWheelZoom={true}>
            <MapEventsComponent event={setSearchLocation} />
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
                  eventHandlers={{
                    click: (e) => {
                      setCurrentExperience(experience.id);
                    },
                  }}
                >
                  <Popup>{experience.title}</Popup>
                </Marker>
              );
            })}
            {searchLocation ? (
              <Marker position={searchLocation} icon={velienceMapIconRed}>
                <Popup>
                  Current location <br />
                </Popup>
              </Marker>
            ) : null}
          </MapContainer>
        ) : (
          <p>Geolocating...</p>
        )}

        <form ref={formRef}>
          <label htmlFor="experience">Experience</label>
          <input
            onChange={updateExperiences}
            type="checkbox"
            name="experience"
            id="experience"
          />
          <label htmlFor="travel">Travel</label>
          <input
            onChange={updateExperiences}
            type="checkbox"
            name="travel"
            id="travel"
          />

          <label htmlFor="distance">Distance</label>
          <input
            onChange={updateExperiences}
            type="range"
            id="distance"
            name="distance"
          />
        </form>

        {experiences ? (
          <CardList
            selectedId={currentExperience}
            cards={experiences}
          ></CardList>
        ) : null}
      </Main>
    </>
  );
};
