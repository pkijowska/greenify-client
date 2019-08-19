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
  var startDate = this.state.availability.map((p) => {
        // generate a Date for from and to values.
        const dateFrom = new Date(p.from);
        const dateTo = new Date(p.to);

        // .getDate() returns the day of the month, if it is the 6th of August, it will return 6.
        // .setDate() sets the date, so by running this instead of d++, we are incrementing the date every loop.

        // Loop through dates from the start date until the end date, each loop increment the date by 1.
        // inside loop, push the day into the array.
        for (var d = dateFrom; d <= dateTo; d.setDate(d.getDate() + 1)) {
            listDate.push(new Date(d));
        }
      });

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

    { listDate.map((dates) => {
      return <span><span>{ dates.toString() } - </span><Link to={ '/' }>Book</Link><br /></span>
    })}


    </div>
  )
}
}


export default PlantInfo;
