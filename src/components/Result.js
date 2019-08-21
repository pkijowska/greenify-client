import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import serverURL from "../ServerURL";

const SERVER_URL = serverURL('plants.json');


class PlantContainer extends Component {
  constructor() {
      super();
      this.state={
        plants : [],

      };

    const fetchingPlants =() => {
      axios.get(SERVER_URL).then((result) => {

        this.setState({plants: result.data[0]});
        console.log(result.data);


      });
    };
    fetchingPlants();

  }

  render(){
    return(

      <div>
        {
        <p key={this.state.plants.id}> Your spirit plant is:
             {this.state.plants.name} </p>}
             <Link to={ "/plants/58" }>
             <Image cloudName="dto4pzoz6" publicId={this.state.plants.images} width="300" className="allPlantsShow" />
             </Link>
      </div>
    )
  }
}

const Result = ({ score, playAgain}) => (
  <div className="score-board">
  <div className="score"> You scored {score} / 4 </div>
  <button className="playBtn" onClick={playAgain}>
  Play Again!
  </button>
  <PlantContainer />
</div>
);

export default Result;
