import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import serverURL from "../ServerURL";
import moment from "moment";

const SERVER_URL = serverURL('plants.json');
const SERVER_AVAIL_URL = serverURL('availabilities');


class PlantContainer extends Component {
  constructor() {
      super();
      this.state={
        plants : [],
        availabilities : [],
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

    const fetchAvailabilities =() => {
      axios.get(SERVER_AVAIL_URL).then((result) => {
        this.setState({availabilities: result.data});
        setTimeout(fetchAvailabilities, 40000);
      });
    };
    fetchAvailabilities();
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
      <div className="centerForm">
        <h2>This is a plant area. See our plants:</h2>
        <form onSubmit={this._handleSubmit}>

        <label htmlFor="query">
        <p>Search:</p>
        <input type="search" id="query" onInput={ this._handleInputSearch } />
        </label>
        <input type="submit" value="Filter" />
        </form>

        <Gallery plants={this.state.plants} availabilities={this.state.availabilities} query={this.state.query}/>
      </div>
    )
  }
}



class Gallery extends Component {
  checkingdate(created_at) {
   let checkdate = created_at;
   console.log(checkdate);
   let newInTown = 'New';
   if (moment().format("l") == moment(checkdate).format("l")) {
       return true;
     }
 }
  render() {
    return(
      <div className="allPlantsGrid">
        {this.props.plants.map((plant) => {

          const plantpara = <div className="allPlantName"><p key={plant.id}>
             <Link to={ "/plants/" + plant.id }>
             <Image cloudName="dto4pzoz6" publicId={plant.images} width="300" className="allPlantsShow" />
             </Link></p>
           <p><h4>{plant.name}</h4>{this.checkingdate(plant.created_at) ? <span className="newPlant">NEW</span> : ""}
           </p>
           {this.props.availabilities.map((a) => {
             if (a.plant_id === plant.id) {
               return <p>Rent me from {moment(a.from).format('ll')} <br /> to {moment(a.to).format('ll')}</p>
             }
           })}

           </div>
           console.log(plantpara);
           const query = this.props.query.toLowerCase();
           const name = plant.name.toLowerCase();

            if (name.indexOf(query) !== -1){
              return plantpara;
            }
       })
      }
    </div>
    )
  }
}


export default PlantContainer;
