import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/plants.json'

class PlantContainer extends Component {
  constructor() {
    super();
    this.state={
      plants : [],
      query : ""
    };

  this._handleSubmit = this._handleSubmit.bind(this);
  this._handleInputSearch = this._handleInputSearch.bind(this);


const fetchPlants =() => {
  axios.get(SERVER_URL).then((result) => {
    this.setState({plants: result.data});
  console.log(this.state.plants);
    setTimeout(fetchPlants, 40000);
            });
          };
          fetchPlants();
          }

    _handleSubmit (event) {
      event.preventDefault();
      this.setState({query: '' })
      console.log("click");
          }


   _handleInputSearch (event) {
    this.setState({
    query: event.target.value,})
    console.log(event.target.value);
          }



  render(){
    return(
      <div>
        <button><Link to="/">Go back!</Link></button>



        <h2>This is a plant area. See our plants:</h2>
        <form onSubmit={this._handleSubmit}>

        <label htmlFor="query">
        <p>Search:</p>
        <input type="search" id="query" onInput={ this._handleInputSearch } />
        </label>
        <input type="submit" value="Filter" />
        </form>

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
           <Link to={ "/plants/" + plant.id }>
           <Image cloudName="dto4pzoz6" publicId={plant.images} width="300" />
           </Link>
        </p>)
            }
    </div>
    )
  }
}


export default PlantContainer;