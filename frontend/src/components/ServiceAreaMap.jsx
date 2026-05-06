import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom navy marker icon (no external image dependency, no Ukrainian flag)
const navyIcon = L.divIcon({
  className: 'delta-hq-marker',
  html: `
    <div style="
      width: 26px; height: 26px; border-radius: 50%;
      background: #0a2540; border: 3px solid #ffffff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      display:flex; align-items:center; justify-content:center;
    ">
      <div style="width:8px;height:8px;border-radius:50%;background:#ffffff;"></div>
    </div>
  `,
  iconSize: [26, 26],
  iconAnchor: [13, 13],
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

// Delta Roofing HQ — 1000 Martin Grove Rd, Etobicoke
const HQ_COORDS = [43.6815, -79.5743];
const GTA_ZOOM = 10;
const CITY_ZOOM = 12;

const FlyTo = ({ selectedCity }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedCity && cityCoordinates[selectedCity]) {
      map.flyTo(cityCoordinates[selectedCity], CITY_ZOOM, { duration: 0.8 });
    } else {
      map.flyTo(HQ_COORDS, GTA_ZOOM, { duration: 0.8 });
    }
  }, [selectedCity, map]);
  return null;
};

const ServiceAreaMap = ({ selectedCity }) => {
  return (
    <MapContainer
      center={HQ_COORDS}
      zoom={GTA_ZOOM}
      scrollWheelZoom={false}
      zoomControl={false}
      attributionControl={false}
      style={{ width: '100%', height: '100%' }}
      data-testid="service-area-leaflet-map"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={19}
      />
      <Marker position={HQ_COORDS} icon={navyIcon}>
        <Popup>
          <strong>Delta Roofing Inc.</strong>
          <br />
          1000 Martin Grove Rd
          <br />
          Etobicoke, ON M9W 4V8
        </Popup>
      </Marker>
      <FlyTo selectedCity={selectedCity} />
    </MapContainer>
  );
};

export default ServiceAreaMap;
