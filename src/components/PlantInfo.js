import React, { Component } from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import serverURL from "../ServerURL";



const SERVER_URL = serverURL('plants/7.json');
// const AVA_URL = serverURL('availabilities.json');


class PlantInfo extends Component {
constructor(props){
  super(props);
  this.state= {
    plantInfo : [],
    availability : []
  }

  const plant_id = this.props.match.params.id;
  const URL = serverURL("plants/" + plant_id + ".json");

const  AVAIL =  serverURL('plants/'+ plant_id +'/availabilities');
console.log(AVAIL);

  const fetchPlantInfo =() => {
    axios.get(URL).then((result) => {
      this.setState({plantInfo: result.data});
      console.log(result.data[0]);
      setTimeout(fetchPlantInfo, 40000);
    });
  };
  fetchPlantInfo();


  const fetchAva =() => {
    axios.get(AVAIL).then((result) => {
    this.setState({availability: result.data});
    console.log(result.data);
    // setTimeout(fetchAva, 40000);
    });
    };
  fetchAva();
}


render(){
  var listDate = [];
  var startDate =this.state.availability.map((p) => {
        const dateFrom = <p key={p.id}>
        {p.from}</p>

          return dateFrom;
      })
      ;
  var endDate = this.state.availability.map((p) => {
  const  dateTo  =  <p key={p.id}>
      {p.to}</p>
      return dateTo;
    })
;
  var dateMove = new Date(startDate);
  var strDate = startDate;

  while (strDate < endDate){
    var strDate = dateMove.toISOString().slice(0,10);
    listDate.push(strDate);
    dateMove.setDate(dateMove.getDate()+1);
  };
  console.log(listDate);



  return(
    <div>
    <h1> Plant {this.props.match.params.id}</h1>
    <div><Link to={"/plants/"+ this.props.match.params.id +"/edit"}>Edit Plant</Link></div>
    <p>{this.state.plantInfo.name}</p>
    <Image cloudName="dto4pzoz6" publicId={this.state.plantInfo.images} width="300" />
    <p>{this.state.plantInfo.age}</p>
    <p>{this.state.plantInfo.cost} </p>
    <p>{this.state.plantInfo.worth} </p>
    <p>{this.state.plantInfo.description}</p>

      {listDate}


    </div>
  )
}
}


export default PlantInfo;
