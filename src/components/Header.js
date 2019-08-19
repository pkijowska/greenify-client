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

        <Link to="/">Home</Link> |
        <Link to="/plants">Plants</Link> |
        <Link to="/plants/new">Add Plant</Link> |
        <Link to="/bookings">Booking</Link> |
        <Link to="/users">Users</Link> |

        { localStorage.getItem("jwt") ?

            <Link to="/SignOut">Sign Out</Link>
            :
            <span><Link to="/SignIn">Sign In</Link> or
            <Link to="/SignUp"> Sign Up</Link></span>
        }
        <h1 class="greenify-text">Greenify</h1>
      </div>)
  }
}

export default Header;
