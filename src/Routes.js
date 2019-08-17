import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import App from './components/App';
import PlantContainer from './components/PlantContainer';
import CreatePlant from './components/CreatePlant';
import PlantInfo from './components/PlantInfo';

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component= { App } />
        <Route exact path="/plants" component= { PlantContainer } />
        <Route exact path="/plants/new" component= { CreatePlant } />
        <Route exact path="/plants/:id" component={PlantInfo} />

    </div>
  </Router>
)

export default Routes;
