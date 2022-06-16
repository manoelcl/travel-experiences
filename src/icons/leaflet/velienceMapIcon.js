import { icon } from "leaflet";

const velienceMapIcon = icon({
  iconUrl: "marker-icon.png",
  shadowUrl: "marker-shadow.png",
  iconSize: [64, 64],
  shadowSize: [60, 35],
  iconAnchor: [32, 64],
  shadowAnchor: [4, 40],
  popupAnchor: [0, -32],
});

export default velienceMapIcon;
