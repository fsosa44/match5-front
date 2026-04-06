import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Layout from "../components/layout/Layout";
import MatchPopup from "../components/map/MatchPopup";
import { useMatchesStore } from "../stores/matchesStore";

const ballIcon = new L.DivIcon({
  className: "",
  html: `
    <div style="
      width: 55px;
      height: 55px;
      animation: levitate 2s ease-in-out infinite;
      filter: drop-shadow(0 5px 8px rgba(0,0,0,0.35));
    ">
      <img src="/f5Up.png" style="width:100%;height:100%;object-fit:contain;" alt="match" />
    </div>
  `,
  iconSize: [55, 55],
  iconAnchor: [27, 55],
  popupAnchor: [0, -57],
});

const SARANDI_CENTER: L.LatLngExpression = [-34.6775, -58.3290];

const MapScreen = () => {
  const matches = useMatchesStore((s) => s.matches);

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <Layout noPadding>
      <div className="relative h-screen">
        <MapContainer
          center={SARANDI_CENTER}
          zoom={13}
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {matches.map((match) => (
            <Marker
              key={match.id}
              position={[match.lat, match.lng]}
              icon={ballIcon}
            >
              <Popup>
                <MatchPopup match={match} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Layout>
  );
};

export default MapScreen;
