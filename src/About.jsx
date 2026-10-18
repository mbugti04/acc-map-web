import "leaflet/dist/leaflet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapComponent from './MapComponent';
import ForumComponent from './ForumComponent';
import { Container, Navbar, Nav } from 'react-bootstrap';

function About() {
  return (
    <div style={{ padding: '20px', width: '70%', margin: '0 auto', textAlign: 'center' }}>
      <div>
        <h1>The Developer Team</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        <div>
          <h2>Mustafa Bugti</h2>
          <img src="/images/mustafa.png" alt="Mustafa Bugti" width="400" height="400" style={{ objectFit: 'cover' }} />
        </div>
        <div>
          <h2>Jangael Rosales</h2>
          <img src="/images/jangael.jpg" alt="Jangael Rosales" width="400" height="400" style={{ objectFit: 'cover' }} />
        </div>
        <div>
          <h2>Jun Yi He Wu</h2>
          <img src="/images/jun.jpg" alt="Jun Yi He Wu" width="400" height="400" style={{ objectFit: 'cover' }} />
        </div>
        <div>
          <h2>Ricardo Flores</h2>
          <img src="/images/ricardo.png" alt="Ricardo Flores" width="400" height="400" style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}

export default About
