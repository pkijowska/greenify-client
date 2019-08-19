import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PlantForm from './PlantForm';
import serverURL from "../ServerURL";

const PLANT_API = serverURL('plants.json');
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

      const { name,image, age, status, cost, worth, description } = this.state;
      const plant = { name, image, age, status, cost, worth, description }

      console.log(plant);

      axios.post(PLANT_API, plant)
        .then(result => {

          const file = new FormData();
          if(this.state.file){
            file.append('file', this.state.file);
          }

          axios.put(PLANT_IMAGE_API + result.data.id + '.json', file)
            .then(res => {
              this.props.history.push('/plants');
            })

        })
        .catch(error => {
          console.log(error);
        });

      event.preventDefault();
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
