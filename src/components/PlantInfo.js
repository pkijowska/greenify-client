import React, { Component } from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react';

const SERVER_URL = 'http://localhost:3000/plants/7.json'



class PlantInfo extends Component {
constructor(props){
  super(props);
  this.state= {
    plantInfo : []
  }

  const plant_id = this.props.match.params.id;
  const URL = "http://localhost:3000/plants/" + plant_id + ".json";


  const fetchPlantInfo =() => {
    axios.get(URL).then((result) => {
      this.setState({plantInfo: result.data});
      console.log(result.data[0]);
      setTimeout(fetchPlantInfo, 40000);
    });
  };
  fetchPlantInfo();
}



render(){
  return(
    <div>
    <h1> Plant {this.props.match.params.id}</h1>
    <p>{this.state.plantInfo.name}</p>
    <Image cloudName="dto4pzoz6" publicId={this.state.plantInfo.images} width="300" />
    <p>{this.state.plantInfo.age}</p>
    <p>{this.state.plantInfo.cost} </p>
    <p>{this.state.plantInfo.worth} </p>
    <p>{this.state.plantInfo.description}</p>
    </div>
  )
}
}



export default PlantInfo;
