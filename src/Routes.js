import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import App from './components/App';
import PlantContainer from './components/PlantContainer';
import CreatePlant from './components/CreatePlant';

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component= { App } />
        <Route exact path="/plants" component= { PlantContainer } />
        <Route exact path="/plants/new" component= { CreatePlant } />

    </div>
  </Router>
)

export default Routes;
