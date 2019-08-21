import React, {Component} from 'react';
// use moment.js to deal with formatting dates.
import moment from "moment";
// Datepicker allows you to pick dates from a dropdown calendar.
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class PlantForm extends Component {
  constructor(){
    super();
    this.state = {
      date_from: "",
      date_to: ""
    }

  }


 render() {
     return (
       <div className="centerForm">
           <form onSubmit={this.props.onSubmit}>
             <label>
               Name:
               <input type="text" name="name" value={this.props.plant.name} onChange={this.props.onTextChange} />
             </label><br/>
             <label>
               image:
                 <input type="file" name="file" onChange={this.props.onFileChange} />
             </label><br/>
             <label>
               Age:
                 <input type="text" name="age" value={this.props.plant.age} onChange={this.props.onTextChange} />
             </label><br/>
             <label>
               Status:
                 <input type="text" name="status" value={this.props.plant.status} onChange={this.props.onTextChange} />
             </label><br/>
             <label>
               Cost:
                 <input type="text" name="cost" value={this.props.plant.cost} onChange={this.props.onTextChange}/>
             </label><br/>
             <label>
               Worth:
                 <input type="text" name="worth" value={this.props.plant.worth} onChange={this.props.onTextChange}/>
             </label><br/>
             <label>
               Desciption:
                 <textarea name="description" value={this.props.plant.description} onChange={this.props.onTextChange}/>
             </label><br/>

             <label>
              Availability:
              <div class="plantProfileBookingGrid">
                <span>
                  <p>From:</p>
                  <DatePicker
                      name= "date_from"
                      todayButton={"Today"}
                      selected={this.props.date_from}
                      selectsStart
                      startDate={this.props.date_from}
                      endDate={this.props.date_to}
                      onChange={this.props.onDateFromChange}
                      placeholderText="Select a Start Date"
                    />
                  </span>
                  <span>
                    <p>To:</p>
                    <DatePicker
                        name= "date_to"
                        todayButton={"Today"}
                        selected={this.props.date_to}
                        selectsEnd
                        startDate={this.props.date_from}
                        endDate={this.props.date_to}
                        onChange={this.props.onDateToChange}
                        placeholderText="Select an End Date"
                    />
                  </span>
                </div>
              </label><br />

               <input type="submit" value= {this.props.buttonLabel} />
             </form>
         </div>
     )
   }
 }

 export default PlantForm;
