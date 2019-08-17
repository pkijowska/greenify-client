import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const PLANT_API = 'http://localhost:3000/plants.json';

class CreatePlant extends Component {
  constructor(){
    super();
    this.state = {
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
      this.setState({ [event.target.name]: event.target.value});
  }


  handleSubmit(event) {

      alert('Plant added : ' + this.state.name);

      const { name, age, status, cost, worth, description } = this.state;

      const plant = { name, age, status, cost, worth, description }

      console.log(plant);

      axios.post(PLANT_API, plant)
        .then(result => {
          alert('Saved successfully');
        })
        .catch(error => {
          console.log(error);
        });

      event.preventDefault();
  }

  render() {
    return (
      <div>
          <h2>Create a new Plant</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" onChange={this.handleChange} />
            </label><br/>
            <label>
              Age:
                <input type="text" name="age" onChange={this.handleChange} />
            </label><br/>
            <label>
              Status:
                <input type="text" name="status" onChange={this.handleChange} />
            </label><br/>
            <label>
              Cost:
                <input type="text" name="cost" onChange={this.handleChange}/>
            </label><br/>
            <label>
              Worth:
                <input type="text" name="worth" onChange={this.handleChange}/>
            </label><br/>
            <label>
              Desciption:
                <textarea name="description" onChange={this.handleChange}/>
            </label><br/>
              <input type="submit" value="Add Plant" />
            </form>
        </div>

    )
  }
}


export default CreatePlant;
