import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import serverURL from "../ServerURL";

// Created this class to test authentication.
// Only shows all plants if you have logged in, otherwise you are not allowed.
// this is set through the plants controller in rails, by including: before_action :authenticate_user
class UserProfile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: ""
    }

    console.log(this)
    const url = serverURL("/api/users/" + this.props.match.params.id);
    // to get the token and send it through the header, you need to add "bearer" with a space after it at the beginning.
    const token = "Bearer " + localStorage.getItem("jwt");
    const getPlants = function () {
      // make a post request with a header with Auth token sent through. Will only send if logged in, otherwise will cause error.
      axios.get(url)
      .then(response => {
        this.setState({ user: response.data })
      })
      .catch(error => console.log('error', error));
    }.bind(this)();

  }

  render() {
    const user = this.state.user;
    return (
      <div>
            <div key={this.state.user.id}>
              <h2><Link to={`/api/users/${this.state.user.id}`}>{this.state.user.name}</Link></h2>
              {this.state.user.email}
              {this.state.user.admin}
              {this.state.user.is_seller}
              <hr/>
            </div>
      </div>)
  }
}

export default UserProfile;
