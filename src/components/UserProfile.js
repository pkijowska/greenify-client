import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import serverURL from "../ServerURL";
import avatar1 from "../images/avatars/boy-1.svg"
import avatar2 from "../images/avatars/boy.svg"
import avatar3 from "../images/avatars/girl-1.svg"
import avatar4 from "../images/avatars/girl.svg"
import avatar5 from "../images/avatars/man-1.svg"
import avatar6 from "../images/avatars/man-2.svg"
import avatar7 from "../images/avatars/man-3.svg"
import avatar8 from "../images/avatars/man-4.svg"
import avatar9 from "../images/avatars/man.svg"

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

    this.randomImg = this.randomImg.bind(this);

  }

  randomImg () {
    const images = [ avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9 ];
    const max = images.length;
    const randomNum = Math.floor(Math.random() * max);
    return images[randomNum];
  }

  render() {
    const profileImg = this.randomImg();
    const user = this.state.user;
    return (
      <div className="userProfile">
            <div key={this.state.user.id}>
              <h2>{this.state.user.name}</h2>
              <img src={ profileImg } className="profile" />
              {this.state.user.email}
              {this.state.user.admin}
              {this.state.user.is_seller}
            </div>
      </div>)
  }
}

export default UserProfile;
