import "leaflet/dist/leaflet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import About from './About'; 
import Resources from "./Resources"
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css'
import MapComponent from './MapComponent';
import ForumComponent from './ForumComponent';
import ReportForm from './ReportForm';
import SplitGutter from './SplitGutter';
import { DEFAULT_CENTER, DEFAULT_SPLIT } from './constants';
import { Container, Navbar, Nav, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const VIEWS = [
  { value: 'map', label: 'Map' },
  { value: 'both', label: 'Both' },
  { value: 'forum', label: 'Feed' },
];

function ReportButton({ onClick }) {
  const { pathname } = useLocation();
  if (pathname !== '/') return null;
  return (
    <Button variant="primary" onClick={onClick}>
      Report an obstacle
    </Button>
  );
}

function loadSplit() {
  try {
    const saved = parseFloat(localStorage.getItem('accmap-split'));
    return saved > 0 && saved < 1 ? saved : DEFAULT_SPLIT;
  } catch {
    return DEFAULT_SPLIT;
  }
}

function loadView() {
  try {
    const saved = localStorage.getItem('accmap-view');
    return VIEWS.some(v => v.value === saved) ? saved : 'both';
  } catch {
    return 'both';
  }
}

function App() {
  const [locations, setLocations] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  const [draftPin, setDraftPin] = useState(null);
  const [view, setView] = useState(loadView);
  const [split, setSplit] = useState(loadSplit);
  const panesRef = useRef(null);
  // fr values must sum to at least 1, or the map leaves empty space once the feed hits its minimum width
  const splitStyle = { '--map-fr': `${split * 100}fr`, '--feed-fr': `${(1 - split) * 100}fr` };

  useEffect(() => {
    try {
      localStorage.setItem('accmap-split', split.toFixed(3));
    } catch {
      // Storage can be blocked; the split still works for this visit
    }
  }, [split]);

  const changeView = (value) => {
    setView(value);
    try {
      localStorage.setItem('accmap-view', value);
    } catch {
      // Storage can be blocked; the toggle still works for this visit
    }
  };

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
      <Navbar expand="md" className="bg-body-tertiary">
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
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About Us</Nav.Link>
              <Nav.Link as={Link} to="/resources">Resources</Nav.Link>
            </Nav>
            <ReportButton onClick={() => setDraftPin(userPosition || DEFAULT_CENTER)} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className="app-main">
        <Routes>
          <Route path="/" element={
            <div className="home">
              <div className="view-toolbar">
                <ToggleButtonGroup type="radio" name="view" value={view} onChange={changeView} aria-label="Choose what to show">
                  {VIEWS.map(v => (
                    <ToggleButton key={v.value} id={`view-${v.value}`} value={v.value} variant="outline-primary" size="sm">
                      {v.label}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </div>
              <div
                ref={panesRef}
                className={`panes view-${view}`}
                style={splitStyle}
              >
                <div className="map" id="map">
                  <MapComponent
                    locations={locations}
                    userPosition={userPosition}
                    draftPin={draftPin}
                    onPick={setDraftPin}
                  />
                </div>
                {view === 'both' && (
                  <SplitGutter containerRef={panesRef} split={split} onChange={setSplit} />
                )}
                <div className="forum" id="forum">
                  <ForumComponent locations={locations} />
                </div>
              </div>
            </div>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </main>
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
