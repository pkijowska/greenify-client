import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import App from './components/App';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import AllPlantsTest from './components/AllPlantsTest';
import PlantsTest from './components/PlantsTest';
import PlantContainer from './components/PlantContainer';
import CreatePlant from './components/CreatePlant';
import PlantInfo from './components/PlantInfo';

// TODO: make Header refresh like the rest of the pages. e.g. when you logout it wont refresh the navbar automatically.
const Routes = (
    <Router>
    <Header />
      <div>
      <Switch>
        <Route exact path="/" component= { App } />
        <Route exact path="/plants" component= { PlantContainer } />
        <Route exact path="/plants/new" component= { CreatePlant } />
        <Route exact path="/plants/:id" component={PlantInfo} />


        <Route exact path="/allplantstest" component= { AllPlantsTest } />
        <Route exact path="/SignUp" component= { SignUp } />
        <Route path="/plants/:id" component= { PlantsTest } />
        { localStorage.getItem("jwt") ?
            <Route exact path="/SignOut" component= { SignOut } />
            :
            <Route exact path="/SignIn" component= { SignIn } />
        }
      </Switch>
      </div>
      <Footer />
    </Router>
)

export default Routes;
