import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import App from './components/App';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import AllPlantsTest from './components/AllPlantsTest';
import PlantsTest from './components/PlantsTest';

// TODO: make Header refresh like the rest of the pages. e.g. when you logout it wont refresh the navbar automatically.
const Routes = (
    <Router>
    <Header />
      <div>
        <Route exact path="/" component= { App } />
        <Route exact path="/allplantstest" component= { AllPlantsTest } />
        <Route exact path="/SignUp" component= { SignUp } />
        <Route path="/plants/:id" component= { PlantsTest } />
        { localStorage.getItem("jwt") ?
            <Route exact path="/SignOut" component= { SignOut } />
            :
            <Route exact path="/SignIn" component= { SignIn } />
        }
      </div>
      <Footer />
    </Router>
)

export default Routes;
