import React from 'react';
// import PlantContainer from './PlantContainer';
import { Link } from 'react-router-dom';
import feature from '../images/plant_feature.png';
import '../style/header_art.css';

function Home() {
  return (
    <div>
        <h1 class="greenify-text">Greenify</h1>
        <img src={ feature } className="featureImage" />
    </div>
  );
}

export default Home;
