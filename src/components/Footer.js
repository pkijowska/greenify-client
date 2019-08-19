import React, { Component } from 'react';

// Created this class to test authentication.
// Only shows all plants if you have logged in, otherwise you are not allowed.
// this is set through the plants controller in rails, by including: before_action :authenticate_user
class Footer extends Component {
  constructor () {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div className="footer">
      <span>&copy; greenify 2019</span>
      <div className="footerPos">

        <div class="plantContainer">
          <div class="plant">
          	<div class="branch"></div>
          	<div class="branch"></div>
          	<div class="branch"></div>
          	<div class="branch"></div>
          	<div class="branch"></div>
          	<div class="branch"></div>
          </div>
        </div>
        </div>
      </div>)
  }
}

export default Footer;
