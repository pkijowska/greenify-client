import React, { Component } from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import serverURL from "../ServerURL";
// use moment.js to deal with formatting dates.
import moment from "moment";
// Datepicker allows you to pick dates from a dropdown calendar.
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class PlantInfo extends Component {
constructor(props){
  super(props);
  this.state= {
    plantInfo : [],
    availability : [],
    bookings: [],
    comments: [],
    comment: "",
    rating: "",
    startDate: new Date(),
    endDate: new Date(),
  }
  // Handles the change of the start and end date teh user picks
  this.handleChangeStart = this.handleChangeStart.bind(this);
  this.handleChangeEnd = this.handleChangeEnd.bind(this);
  this._handleSubmit = this._handleSubmit.bind(this);
  this._handleSubmitComment = this._handleSubmitComment.bind(this);
  this._handleChangeRating = this._handleChangeRating.bind(this);
  this._handleChangeComment = this._handleChangeComment.bind(this);

  const plant_id = this.props.match.params.id;
  const URL = serverURL("plants/" + plant_id + ".json");
  const  AVAIL =  serverURL('plants/'+ plant_id +'/availabilities');
  const  BOOKINGS =  serverURL('plants/'+ plant_id +'/bookings');
  const  COMMENTS =  serverURL('plants/'+ plant_id +'/comments');

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
  const fetchBookings =() => {
    axios.get(BOOKINGS).then((result) => {
    this.setState({ bookings: result.data});
    });
    };
  fetchBookings();

  const fetchComments =() => {
    axios.get(COMMENTS).then((result) => {
    this.setState({ comments: result.data});
    });
    setTimeout(fetchComments, 4000);
    };
  fetchComments();
}
  // Handles the change of the start date teh user picks
  handleChangeStart(date) {
      this.setState({
        startDate: date
      });
    }
  // Handles the change of the end date teh user picks
  handleChangeEnd(date) {
      this.setState({
        endDate: date
      });
    }
  _handleSubmit (event) {
    event.preventDefault();
    let from = this.state.startDate
    let to = this.state.endDate
    console.log("from " + from);
    console.log("to " + to);
    const token = "Bearer " + localStorage.getItem("jwt");
    axios({method: 'post', url: serverURL(`plants/${ this.props.match.params.id }/bookings`), headers: {'Authorization': token}, data: {
      booking: {
        from: from,
        to: to
      }
    }}).then(() => window.location.reload());
  }

  _handleSubmitComment (event) {
    event.preventDefault();

    const token = "Bearer " + localStorage.getItem("jwt");
    axios({method: 'post', url: serverURL(`plants/${ this.props.match.params.id }/comments`), headers: {'Authorization': token}, data: {
      comment: {
        comment: this.state.comment,
        rating: this.state.rating,
      }

    }}).then(() => window.location.reload());
  }

  _handleChangeComment (event) {
    this.setState({comment: event.target.value});
  }

  _handleChangeRating (event) {
    this.setState({rating: event.target.value});
  }


render(){
  let listDate = [];
  let startAvailableDate = "";
  let endAvailableDate = "";
  let startDate = this.state.availability.map((p) => {
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
      // use this array to populate with all the dates that have already been booked
      // to do this, filter through all the bookings, then add each date to this list.
      let bookedDates = [ ];
      this.state.bookings.map((b) => {
        // generate a Date for from and to values.
        const dateFrom = new Date(b.from);
        const dateTo = new Date(b.to);
        for (let b = dateFrom; b <= dateTo; b.setDate(b.getDate() + 1)) {
            bookedDates.push(new Date(b));
        }
      })
      // TODO: filter through dates to make an availableDates list, and apply a style to that.
      const highlighted = [{ "bookedDates": bookedDates }];
  return(
    <div>
      <h1 className="plantProfileTitle">{this.state.plantInfo.name}</h1>
      <div className="plantProfileGrid">
        <div className="plantProfileImage">
          <Image cloudName="dto4pzoz6" publicId={this.state.plantInfo.images} width="300" />
        </div>
        <div className="plantProfileStats">
          <p><span className="plantProfileBold">Age: </span>{this.state.plantInfo.age}</p>
          <p><span className="plantProfileBold">Cost: </span>${this.state.plantInfo.cost}</p>
          <p><span className="plantProfileBold">Worth: </span>${this.state.plantInfo.worth}</p>
          <p><span className="plantProfileBold">Description: </span>{this.state.plantInfo.description}</p>
        </div>
        <div className="plantProfileBookingDates">
        <h3>Book this plant:</h3>
        <div class="plantProfileBookingGrid">
          <span>
            <p>From:</p>
            <DatePicker
                todayButton={"Today"}
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeStart}
                minDate={ listDate[0] }
                maxDate={ listDate[listDate.length - 1] }
                highlightDates={ highlighted }
                excludeDates={ bookedDates }
                placeholderText="Select a Start Date"
              />
            </span>
            <span>
              <p>To:</p>
              <DatePicker
                  todayButton={"Today"}
                  selected={this.state.endDate}
                  selectsEnd
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleChangeEnd}
                  minDate={ listDate[0] }
                  maxDate={ listDate[listDate.length - 1] }
                  highlightDates={ highlighted }
                  excludeDates={ bookedDates }
                  placeholderText="Select an End Date"
              />
            </span>
          </div>
          <form onSubmit={ this._handleSubmit }>
            <input type="submit" value="Book Now" />
          </form>
        </div>
      </div>
      <div className="commentSection">
      <h3>Comments</h3>
        {this.state.comments.map((c) => {
          return <div className="comment">
          <p><b>{ c.rating } / 5</b> <span className="commentTime">{ moment(c.updated_at).format("LLL") }</span></p>
          <p>{ c.comment }</p>

          </div>
        })}

        <h3>Make a comment</h3>
        <form onSubmit={ this._handleSubmitComment }>
        Rating:
          <input type="number" onChange={ this._handleChangeRating } />
        Comment:
          <input type="textarea" onChange={ this._handleChangeComment } />
          <input type="submit" value="sumbit" />
        </form>
      </div>
      <div className="plantProfileButtonArea"><Link to={"/plants/"+ this.props.match.params.id +"/edit"}>Edit Plant</Link></div>
    </div>
  )
}
}
export default PlantInfo;
