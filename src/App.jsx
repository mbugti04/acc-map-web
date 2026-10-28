import "leaflet/dist/leaflet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import About from './About'; 
import Resources from "./Resources"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
import MapComponent from './MapComponent';
import ForumComponent from './ForumComponent';
import ReportForm from './ReportForm';
import { DEFAULT_CENTER } from './constants';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

function App() {
  const [locations, setLocations] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  const [draftPin, setDraftPin] = useState(null);

  useEffect(() => {
    fetch('/api/locations').then(res => res.json()).then(data => {
      setLocations(data);
    });
  }, []);

  // Falls back to the default map center if location is denied or unavailable
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => setUserPosition([pos.coords.latitude, pos.coords.longitude]),
      err => console.warn("Geolocation unavailable:", err.message),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const handleCreated = (location) => {
    setLocations(prev => [...prev, location]);
    setDraftPin(null);
  };

  return (
    <Router>
      <Navbar expand="lg" className="bg-body-tertiary" style={{ padding: '0.5rem 1rem', maxHeight: '60px' }}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img
              src="/images/ACCMapLogo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="AccMap logo"
            />
            AccMap
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/resources">Resources</Nav.Link>
          </Nav>
          <Button variant="primary" onClick={() => setDraftPin(userPosition || DEFAULT_CENTER)}>
            Report an obstacle
          </Button>
        </Container>
      </Navbar>
      <div className="container">
        <Routes>
          <Route path="/" element={
            <>
              <div className="map" id="map">
                <MapComponent
                  locations={locations}
                  userPosition={userPosition}
                  draftPin={draftPin}
                  onPick={setDraftPin}
                />
              </div>
              <div className="forum" id="forum">
                <ForumComponent locations={locations} />
              </div>
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>
      {draftPin && (
        <ReportForm
          key={draftPin.join(',')}
          position={draftPin}
          onClose={() => setDraftPin(null)}
          onCreated={handleCreated}
        />
      )}
    </Router>
  );
}

export default App
