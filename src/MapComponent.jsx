import { useEffect, useState } from 'react';
import { DEFAULT_CENTER } from './constants';
import { METERS_PER_MILE } from './geo';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet';

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

// Reports the map's center whenever the user finishes panning or zooming
function TrackCenter({ onChange }) {
  const map = useMap();
  useEffect(() => {
    const report = () => {
      const center = map.getCenter();
      onChange([center.lat, center.lng]);
    };
    report();
    map.on('moveend', report);
    return () => map.off('moveend', report);
  }, [map, onChange]);
  return null;
}

// Faint circle showing the feed's distance filter. Follows the center live while
// dragging, unlike TrackCenter which only reports once the move ends.
function RadiusCircle({ miles }) {
  const map = useMap();
  const [center, setCenter] = useState(() => map.getCenter());
  useMapEvents({
    move() {
      setCenter(map.getCenter());
    },
  });
  return (
    <Circle
      center={center}
      radius={miles * METERS_PER_MILE}
      interactive={false}
      pathOptions={{ color: '#0d6efd', weight: 1, opacity: 0.5, fillOpacity: 0.06 }}
    />
  );
}

function ClickToPin({ onPick }) {
  useMapEvents({
    click(e) {
      onPick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

function MapComponent({ locations, geoPosition, radiusMiles, onCenterChange, draftPin, onPick }) {
  return (
    <>
      <MapContainer center={DEFAULT_CENTER} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ResizeWithContainer />
        <RecenterOnUser position={geoPosition} />
        <TrackCenter onChange={onCenterChange} />
        <ClickToPin onPick={onPick} />
        <RadiusCircle miles={radiusMiles} />
        {locations.map(location => (
          <Marker key={location.id} position={[location.latitude, location.longitude]}>
            <Popup>
              <strong>{location.marker_title}</strong><br />{location.marker_description}
            </Popup>
          </Marker>
        ))}
        {draftPin && <Marker position={draftPin} opacity={0.6} />}
      </MapContainer>
      {/* Your location is the center of the view, so the dot is fixed there rather than placed on the map */}
      <div className="user-location-dot" aria-hidden="true" />
    </>
  );
}

export default MapComponent;
