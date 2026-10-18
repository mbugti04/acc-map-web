import "leaflet/dist/leaflet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapComponent from './MapComponent';
import ForumComponent from './ForumComponent';
import { Container, Navbar, Nav } from 'react-bootstrap';

function Resources() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('/api/locations').then(res => res.json()).then(data => {
      setLocations(data);
    });
  }, []);

  return (
    <h1>Resources</h1>
  );
}

export default Resources
