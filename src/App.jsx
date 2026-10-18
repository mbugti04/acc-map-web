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
import { Container, Navbar, Nav } from 'react-bootstrap';

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('/api/locations').then(res => res.json()).then(data => {
      setLocations(data);
    });
  }, []);

  return (
    <Router>
      <Navbar expand="lg" className="bg-body-tertiary" style={{ padding: '0.5rem 1rem', maxHeight: '60px' }}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img
              src="src/assets/ACCMapLogo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            AccMap
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/resources">Resources</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="container">
        <Routes>
          <Route path="/" element={
            <>
              <div className="map" id="map">
                <MapComponent locations={locations} />
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
    </Router>
  );
}

export default App
