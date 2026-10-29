import { useEffect } from 'react';
import { DEFAULT_CENTER } from './constants';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap, useMapEvents } from 'react-leaflet';

// Recenters the map once the user's location is known
function RecenterOnUser({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 15);
    }
  }, [map, position]);
  return null;
}

// Leaflet only notices window resizes, so tell it when its pane changes size
// (view toggles, the grid reflowing, or being shown again after display: none)
function ResizeWithContainer() {
  const map = useMap();
  useEffect(() => {
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);
  return null;
}

function ClickToPin({ onPick }) {
  useMapEvents({
    click(e) {
      onPick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

function MapComponent({ locations, userPosition, draftPin, onPick }) {
  return (
    <MapContainer center={DEFAULT_CENTER} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ResizeWithContainer />
      <RecenterOnUser position={userPosition} />
      <ClickToPin onPick={onPick} />
      {userPosition && (
        <CircleMarker center={userPosition} radius={8} pathOptions={{ color: '#0d6efd', fillOpacity: 0.6 }}>
          <Popup>You are here</Popup>
        </CircleMarker>
      )}
      {locations.map(location => (
        <Marker key={location.id} position={[location.latitude, location.longitude]}>
          <Popup>
            <strong>{location.marker_title}</strong><br />{location.marker_description}
          </Popup>
        </Marker>
      ))}
      {draftPin && <Marker position={draftPin} opacity={0.6} />}
    </MapContainer>
  );
}

export default MapComponent;
