import { latLng } from "leaflet";
import { useMapEvents } from "react-leaflet";

function MapEventsComponentOnClick({ event }) {
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

export default MapEventsComponentOnClick;
