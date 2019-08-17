import React from 'react';
// import PlantContainer from './PlantContainer';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <div><Link to="/">home</Link></div>
        <div><Link to="/plants">Plants</Link></div>        
        <div><Link to="/plants/new">Add Plant</Link></div>
    </div>
  );
}

export default App;
