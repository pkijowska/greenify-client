import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/plants.json'

class PlantContainer extends Component {
constructor() {
  super();
  this.state={
    plants : []
  };

const fetchPlants =() => {
  axios.get(SERVER_URL).then((result) => {
    this.setState({plants: result.data});
    console.log(result.data[0].name);
    setTimeout(fetchPlants, 40000);
  });
};
fetchPlants();
}
  render(){
    return(
      <div>
      <button><Link to="/">Go back!</Link></button>
      <h2>This is a plant area. See our plants:</h2>
      <Gallery plants={this.state.plants}/>
      </div>
    )
  }
}

class Gallery extends Component {
  render() {
    return(
      <div>
{this.props.plants.map((plant) => <p key={plant.id}> {plant.name}
   <Link to={ "/plant/" + plant.id }><img src={plant.images} /> </Link>
</p>)
}
      </div>
    )
  }
}




export default PlantContainer;
