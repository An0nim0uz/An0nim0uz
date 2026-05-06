import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default marker icons (they break with bundlers like CRA)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const cityCoordinates = {
  'Toronto': [43.6532, -79.3832],
  'Mississauga': [43.589, -79.6441],
  'Brampton': [43.7315, -79.7624],
  'Vaughan': [43.8361, -79.4985],
  'Markham': [43.8561, -79.337],
  'Richmond Hill': [43.8828, -79.4403],
  'Oakville': [43.4675, -79.6877],
  'Burlington': [43.3255, -79.799],
  'Pickering': [43.8384, -79.0868],
  'Ajax': [43.8509, -79.0205],
};

const GTA_CENTER = [43.7, -79.4];
const GTA_ZOOM = 9;
const CITY_ZOOM = 12;

// Helper component that flies the map to a new location when selectedCity changes
const FlyTo = ({ selectedCity }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedCity && cityCoordinates[selectedCity]) {
      map.flyTo(cityCoordinates[selectedCity], CITY_ZOOM, { duration: 0.8 });
    } else {
      map.flyTo(GTA_CENTER, GTA_ZOOM, { duration: 0.8 });
    }
  }, [selectedCity, map]);
  return null;
};

const ServiceAreaMap = ({ selectedCity }) => {
  return (
    <MapContainer
      center={GTA_CENTER}
      zoom={GTA_ZOOM}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%' }}
      data-testid="service-area-leaflet-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.entries(cityCoordinates).map(([city, coords]) => (
        <Marker key={city} position={coords}>
          <Popup>
            <strong>{city}</strong>
            <br />
            Service Area
          </Popup>
        </Marker>
      ))}
      <FlyTo selectedCity={selectedCity} />
    </MapContainer>
  );
};

export default ServiceAreaMap;
