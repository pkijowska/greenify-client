import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import App from './components/App';
import PlantContainer from './components/PlantContainer';

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component= { App } />
        <Route exact path="/plants" component= { PlantContainer } />
      
    </div>
  </Router>
)

export default Routes;
