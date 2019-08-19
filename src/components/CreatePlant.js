import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PlantForm from './PlantForm';
import serverURL from "../ServerURL";

const PLANT_API = serverURL('plants');
const PLANT_IMAGE_API = serverURL('plants/');

class CreatePlant extends Component {
  constructor(){
    super();
    this.state = {
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value});
  }

  handleFileChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  handleSubmit(event) {
      event.preventDefault();
      // Cloudinary
      // Create file when you upload, then append it to a FormData here.
      const file = new FormData();
      if(this.state.file){
        file.append('file', this.state.file);
      }

      const { name,image, age, status, cost, worth, description } = this.state;
      const plant = {name, image, age, status, cost, worth, description, file};

      console.log(plant);

      // const url = serverURL("plants");
      // // to get the token and send it through the header, you need to add "bearer" with a space after it at the beginning.
      const token = "Bearer " + localStorage.getItem("jwt");
      //axios({method: 'get', url: url, headers: {'Authorization': token }})
      axios({method: 'post', url: PLANT_API, headers: {'Authorization': token}, data: { plant }})
        .then(result => {
          this.props.history.push("/plants");

        })
        .catch(error => {
          console.log(error);
        });
  }

  render() {
    return (
      <div>
        <h2> Create New Plant </h2>
        <PlantForm
          heading = "Create New Plant"
          onTextChange={this.handleChange}
          onFileChange={this.handleFileChange}
          onSubmit={this.handleSubmit}
          buttonLabel = "Add Plant"
          plant={{}} />
      </div>

    )
  }
}


export default CreatePlant;
