import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
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
      user: "",
      isLoaded: false
    }

    console.log(this)
    const url = serverURL("/api/users/" + this.props.match.params.id);

    // to get the token and send it through the header, you need to add "bearer" with a space after it at the beginning.
    const token = "Bearer " + localStorage.getItem("jwt");
    const getUser = function () {
      // make a post request with a header with Auth token sent through. Will only send if logged in, otherwise will cause error.
      axios.get(url)
      .then(response => {
        this.setState({ user: response.data })

      })
      .then(r => {
        this.setState({ isLoaded: true })
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

  // {this.state.user.bookings.map((b) => {
  //   return <p>Booking plant: {b.plant_id}</p>
  // })}
  //
  // {this.state.user.plant.map((p) => {
  //   return <p>Plant: {p.name ? p.name : ""}</p>
  // })}

  render() {
    const profileImg = this.randomImg();
    const user = this.state.user;
    {if (this.state.isLoaded) {
      console.log(this.state.user);
      return (
        <div className="userProfile">
              <div key={this.state.user.user.id}>
                <h2>{this.state.user.user.name}</h2>
                <img src={ profileImg } className="profile" />
                {this.state.user.user.email}
                {this.state.user.user.admin}
                {this.state.user.user.is_seller}
              </div>

                <h3>Plants:</h3>
                <div className="userAssociationGrid">
                {this.state.user.user.plants.map((p) => {
                  return <p className="UserPlantOwn" key={p.id}>
                     {p.name}
                     <Link to={ "/plants/" + p.id }>
                     <Image cloudName="dto4pzoz6" publicId={p.images} width="300" className="allPlantsShow" />
                     </Link>
                   </p>
                })}
                </div>

              <h3>Bookings:</h3>
              <div className="userAssociationGrid">
                {this.state.user.user.bookings.map((b) => {
                  return <p className="UserPlantBook" key={b.id}>
                     {b.plant.name}
                     <Link to={ "/plants/" + b.plant_id }>
                     <Image cloudName="dto4pzoz6" publicId={b.plant.images} width="300" className="allPlantsShow" />
                     </Link>
                   </p>
                })}
              </div>

        </div>)
    }
    else {
      return <div>loading...</div>
    }}

  }
}

export default UserProfile;
