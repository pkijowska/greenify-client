import React, { Component } from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import serverURL from "../ServerURL";

const SERVER_URL = serverURL('plants/7.json');


class PlantInfo extends Component {
constructor(props){
  super(props);
  this.state= {
    plantInfo : []
  }

  const plant_id = this.props.match.params.id;
  const URL = serverURL("plants/" + plant_id + ".json");


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
    <div className="centerForm">
    <h1> Plant {this.props.match.params.id}</h1>
    <div><Link to={"/plants/"+ this.props.match.params.id +"/edit"}>Edit Plant</Link></div>
    <p>{this.state.plantInfo.name}</p>
    <Image cloudName="dto4pzoz6" publicId={this.state.plantInfo.images} width="300" />
    <p>{this.state.plantInfo.age}</p>
    <p>{this.state.plantInfo.cost} </p>
    <p>{this.state.plantInfo.worth} </p>
    <p>{this.state.plantInfo.description}</p>

   <Link to="/SignIn">  <button> Book it now!</button> </Link>

    </div>
  )
}
}



export default PlantInfo;
