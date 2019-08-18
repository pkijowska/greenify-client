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
      <div style={{color: "white", padding: "15px 0", marginTop: "40px", borderTop: "1px solid grey", backgroundColor: "grey"}}>
        c. greenify 2019
      </div>)
  }
}

export default Footer;
