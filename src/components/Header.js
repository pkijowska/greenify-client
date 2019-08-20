import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/leaf_dark.png';
import logo_green from '../images/leaf_green.png';

// Created this class to test authentication.
// Only shows all plants if you have logged in, otherwise you are not allowed.
// this is set through the plants controller in rails, by including: before_action :authenticate_user
class Header extends Component {
  constructor () {
    super();
    this.state = {
      image: ""
    }

    this._handleHover = this._handleHover.bind(this);
    this._handleOut = this._handleOut.bind(this);
  }

  _handleHover () {
    console.log("hover");
    this.setState({image: logo_green });
  }

  _handleOut () {
    console.log("out");
    this.setState({image: logo });
  }

  render() {
    return (
      <div className="nav">
        <Link to={ '/' } className="headerTitle"><h1 onMouseOver={ this._handleHover } onMouseOut={ this._handleOut } >greenify<img src={ logo } className="logo nohover" /><img src={ logo_green } className="logo hover" /></h1></Link>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/plants/new">Add Plant</Link>
          <Link to="/users">Users</Link>

          { localStorage.getItem("jwt") ?

              <Link to="/SignOut">Sign Out</Link>
              :
              <span><Link to="/SignIn">Sign In</Link> or
              <Link to="/SignUp"> Sign Up</Link></span>
          }

        </div>
      </div>)
  }
}

export default Header;
