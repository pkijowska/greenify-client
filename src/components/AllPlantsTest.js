import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Created this class to test authentication.
// Only shows all plants if you have logged in, otherwise you are not allowed.
// this is set through the plants controller in rails, by including: before_action :authenticate_user
class AllPlantsTest extends Component {
  constructor () {
    super();
    this.state = {
      plants: []
    }


    const url = "http://localhost:3001/plants";
    // to get the token and send it through the header, you need to add "bearer" with a space after it at the beginning.
    const token = "Bearer " + localStorage.getItem("jwt");
    const getPlants = function () {
      // make a post request with a header with Auth token sent through. Will only send if logged in, otherwise will cause error.
      axios({method: 'get', url: url, headers: {'Authorization': token }})
      .then(response => {
        this.setState({ plants: response.data })
      })
      .catch(error => console.log('error', error));
    }.bind(this)();

  }

  render() {
    return (
      <div>
      {this.state.plants.map((plant) => {
          return(
            <div key={plant.id}>
              <h2><Link to={`/plants/${plant.id}`}>{plant.name}</Link></h2>
              {plant.description}
              <hr/>
            </div>
          )
        })}
      </div>)
  }
}

export default AllPlantsTest;
