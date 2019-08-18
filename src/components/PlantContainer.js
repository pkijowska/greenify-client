import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/plants.json'

class PlantContainer extends Component {
constructor() {
  super();
  this.state={
    plants : [],
    query : ""
  }
  this._handleSubmit = this._handleSubmit.bind(this);
  this._handleInputSearch = this._handleInputSearch.bind(this);




const fetchPlants =() => {
  axios.get(SERVER_URL).then((result) => {
    this.setState({plants: result.data});

    setTimeout(fetchPlants, 40000);
  });
};
fetchPlants();
}

_handleSubmit (event) {
  event.preventDefault();
}

// change the state value to equal the string input.
_handleInputSearch (event) {

  this.setState({
        query: event.target.value,
      })
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

      <form onSubmit={this._handleSubmit}>
      <label htmlFor="query">
            <p>Search:</p>
            <input type="search" id="query" onInput={ this._handleInputSearch } />
          </label>
      <input type="submit" value="Search" />

            </form>

  {this.props.plants.map((plant) => <p key={plant.id}> {plant.name}
   <Link to={ "/plants/" + plant.id }><img src={plant.images} alt="plants" /> </Link>
</p>)
}
      </div>

    )
  }
}




export default PlantContainer;
