import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './style/style.css';

import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import PlantContainer from './components/PlantContainer';
import CreatePlant from './components/CreatePlant';
import EditPlant from './components/EditPlant';
import UserProfile from './components/UserProfile';
import Users from './components/Users';
import Bookings from './components/Bookings';
import PlantInfo from './components/PlantInfo';


// TODO: make Header refresh like the rest of the pages. e.g. when you logout it wont refresh the navbar automatically.
const Routes = (
    <Router>

      <Header />
        <div className="wrapper">
        <div>
        <Switch>
          <Route exact path="/" component= { Home } />
          <Route exact path="/plants" component= { PlantContainer } />
          <Route exact path="/plants/new" component= { CreatePlant } />
          <Route exact path="/plants/:id" component={ PlantInfo } />
          <Route exact path="/plants/:id/edit" component= { EditPlant } />
          <Route exact path="/users/:id" component= { UserProfile } />
          <Route exact path="/users" component= { Users } />
          <Route exact path="/bookings" component= { Bookings } />
          <Route exact path="/SignUp" component= { SignUp } />
          { localStorage.getItem("jwt") ?
              <Route exact path="/SignOut" component= { SignOut } />
              :
              <Route exact path="/SignIn" component= { SignIn } />
          }
        </Switch>
        </div>
        </div>
        <Footer />

    </Router>
)

export default Routes;
