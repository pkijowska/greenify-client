import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Created this class to test authentication.
// Only shows all plants if you have logged in, otherwise you are not allowed.
// this is set through the plants controller in rails, by including: before_action :authenticate_user
class Header extends Component {
  constructor () {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <h1>greenify</h1>
        <Link to="/">Home</Link> |
        <Link to="/allplantstest">All Plants Test</Link> |

        { localStorage.getItem("jwt") ?
            <Link to="/SignOut">Sign Out</Link>
            :
            <span><Link to="/SignIn">Sign In</Link> or
            <Link to="/SignUp"> Sign Up</Link></span>
        }
      </div>)
  }
}

export default Header;
