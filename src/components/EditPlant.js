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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }


  handleChange(event) {
    this.setState({ plant: {...this.state.plant, [event.target.name]: event.target.value}});
  }

  handleFileChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  handleSubmit(event) {
      event.preventDefault();

      //1. Create plant object by collecting different attributes from state.
      const plant = { ...this.state.plant };

      console.log('saving plant', plant);


      //2. Plant object doesn't have image/file, since file is uploaded as Multipart Form Data request in HTTP **. (read more at https://stackoverflow.com/questions/16958448/what-is-http-multipart-request)
      //** - Although there is a workaround to encode file in base64 and then use it in json payload. ////However this is not recommended.

      // // to get the token and send it through the header, you need to add "bearer" with a space after it at the beginning.
      const token = "Bearer " + localStorage.getItem("jwt");

      //File upload is handled in two step process, since Create Plant is a REST based API, which does not handle file upload directly.
      // a. first we create new plant object in server without images by calling /POST endpoint.
      // b. once the plant is created, we updated the plant with /PUT call which is not REST call but actually a multipart form submit which includes file. On server side, this PUT request will get the file content and upload it in Cloudinary and then update the plant object.

      axios({method: 'patch', url: serverURL(`plants/${plant.id}`), headers: {'Authorization': token}, data: { plant }})
        .then(result => {
          const file = new FormData();
          if(this.state.file)
            file.append('file', this.state.file);

           axios({method: 'put', url: serverURL(`plants/${plant.id}`), data: file, headers:       {'Authorization': token} })
             .then(res => {
               this.props.history.push(`/plants/${plant.id}`);
             });
          //this.props.history.push("/plants");

        })
        .catch(error => {
          console.log(error);
        });
  }
  componentDidMount() {
    const token = "Bearer " + localStorage.getItem("jwt");

    axios({method: 'get', url: serverURL(`plants/${this.props.match.params.id}`), headers: {'Authorization': token}})
            .then(result => {

              console.log(result);
              this.setState ({
                plant: result.data
              })
            });
        }




    render() {

      return (
        <div className="centerForm">
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
