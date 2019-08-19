import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import serverURL from "../ServerURL";

// Created this class to test authentication.
// Only shows all plants if you have logged in, otherwise you are not allowed.
// this is set through the plants controller in rails, by including: before_action :authenticate_user
class Users extends Component {
  constructor () {
    super();
    this.state = {
      users: []
    }


    const url = serverURL("api/users");
    // to get the token and send it through the header, you need to add "bearer" with a space after it at the beginning.
    const token = "Bearer " + localStorage.getItem("jwt");
    const getPlants = function () {
      // make a post request with a header with Auth token sent through. Will only send if logged in, otherwise will cause error.
      axios({method: 'get', url: url, headers: {'Authorization': token }})
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch(error => console.log('error', error));
    }.bind(this)();

  }

  render() {
    return (
      <div>
      {this.state.users.map((user) => {
          return(
            <div key={user.id}>
              <h2><Link to={`/users/${user.id}`}>{user.name}</Link></h2>
              {user.email}
              {user.admin}
              {user.is_seller}
              <hr/>
            </div>
          )
        })}
      </div>)
  }
}

export default Users;
