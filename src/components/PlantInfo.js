import React, { Component } from 'react';
import Rating from './Rating';
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
    user: "",
    plantInfo : [],
    availability : [],
    bookings: [],
    comments: [],
    comment: "",
    rating: "",
    startDate: "",
    endDate: "",
    error: ""
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
    this.setState({error: ""});
      this.setState({
        startDate: date
      });
    }
  // Handles the change of the end date teh user picks
  handleChangeEnd(date) {
    this.setState({error: ""});
      this.setState({
        endDate: date
      });
    }

  _handleSubmit (event) {
    event.preventDefault();
    if (this.state.startDate != "" && this.state.endDate != "") {
      let from = this.state.startDate
      let to = this.state.endDate
      const token = "Bearer " + localStorage.getItem("jwt");
      axios({method: 'post', url: serverURL(`plants/${ this.props.match.params.id }/bookings`), headers: {'Authorization': token}, data: {
        booking: {
          from: from,
          to: to
        }
      }}).then(() => window.location.reload());
    }
    else {
      this.setState({error: "Select some dates"});
    }
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

  checkingdate() {
    let checkdate = this.state.plantInfo.created_at;
    console.log(checkdate);
    let newInTown = 'New';
    if (moment().format("l") == moment(checkdate).format("l")) {
        return newInTown;
      }

    }
    componentDidMount() {
      if(!localStorage.getItem("jwt")) {
        return;
      }

      const token = "Bearer " + localStorage.getItem("jwt");

      axios({method: 'get', url: serverURL("/current_user"), headers: {'Authorization': token }})
      .then(response => {
        this.setState({ user: response.data })
        console.log(this.state.user)
      })
      .catch(error => console.log('error', error));
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
          <Image cloudName="dto4pzoz6" publicId={this.state.plantInfo.images}/>
        </div>
        <div className="plantProfileStats">
          <p><span className="plantProfileBold">Age: </span>{this.state.plantInfo.age}</p>
          <p><span className="plantProfileBold">Cost: </span>${this.state.plantInfo.cost}</p>
          <p><span className="plantProfileBold">Worth: </span>${this.state.plantInfo.worth}</p>

          <p>{this.checkingdate()}</p>
          <p><span className="plantProfileBold">Created </span>{moment(this.state.plantInfo.created_at).format('l')}</p>
          <p><span className="plantProfileBold">Description: </span>{this.state.plantInfo.description}</p>
        </div>
        { localStorage.getItem("jwt") ?
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
            <p>{ this.state.error }</p>
          </div>
          : ""
        }
        </div>

      <div className="commentSection">
      <h3>Comments</h3>
        {this.state.comments.map((c) => {
          return <div className="comment">
          <p><Rating rating={ c.rating } /> <span className="commentTime">- <Link to={ `/users/${ c.user.id }` }>{ c.user.name }</Link> on { moment(c.updated_at).format("LLL") }</span></p>
          <p>{ c.comment }</p>

          </div>
        })}
        {localStorage.getItem("jwt") ?
          <div>
            <h3>Make a comment</h3>
            <form onSubmit={ this._handleSubmitComment }>
            Rating:
              <select onChange={ this._handleChangeRating } required>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5" selected="selected">5</option>
              </select>

            Comment:
              <input type="textarea" onChange={ this._handleChangeComment } required/>
              <input type="submit" value="submit" />
            </form>
          </div>
          : "" }

      </div>
      { this.state.user.id === this.state.plantInfo.user_id ?
          <div className="plantProfileButtonArea"><Link to={"/plants/"+ this.props.match.params.id +"/edit"}>Edit Plant</Link></div>
      : "" }
    </div>
  )
}
}
export default PlantInfo;
