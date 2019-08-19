import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PlantForm from './PlantForm';
import { Image } from 'cloudinary-react';
import serverURL from "../ServerURL";



const PLANT_API = serverURL('plants.json');
const PLANT_IMAGE_API = serverURL('plants/');


class EditPlant extends Component {

constructor(props) {
  super(props);
  this.state = {
    plant: {}
  };
}

componentDidMount() {

  axios.get('http://localhost:3000/plants/'+this.props.match.params.id, this.state.plant)
          .then(result => {

            console.log(result);
            this.setState ({
              plant: result.data
            })
          });
      }


    render() {

      return (
        <div>
          <h2> Edit form </h2>
          <Image cloudName="dto4pzoz6" publicId={this.state.plant.images} width="300" />

        <PlantForm
          onTextChange={this.handleChange}
          onFileChange={this.handleFileChange}
          onSubmit={this.handleSubmit}
          buttonLabel = "Plant Edited"
          plant={ this.state.plant }
        />
        </div>
      )
    }

}



export default EditPlant;
