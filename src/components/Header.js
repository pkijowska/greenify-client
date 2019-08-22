import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/leaf_dark.png';
import logo_green from '../images/leaf_green.png';
import axios from 'axios';
import serverURL from "../ServerURL";
import avatar1 from "../images/avatars/boy-1.svg"
import avatar2 from "../images/avatars/boy.svg"
import avatar3 from "../images/avatars/girl-1.svg"
import avatar4 from "../images/avatars/girl.svg"
import avatar5 from "../images/avatars/man-1.svg"
import avatar6 from "../images/avatars/man-2.svg"
import avatar7 from "../images/avatars/man-3.svg"
import avatar8 from "../images/avatars/man-4.svg"
import avatar9 from "../images/avatars/man.svg"

// Created this class to test authentication.
// Only shows all plants if you have logged in, otherwise you are not allowed.
// this is set through the plants controller in rails, by including: before_action :authenticate_user
class Header extends Component {
  constructor () {
    super();
    this.state = {
      image: "",
      user: ""
    }

    this._handleHover = this._handleHover.bind(this);
    this._handleOut = this._handleOut.bind(this);
  }

  _handleHover () {
    console.log("hover");
    this.setState({image: logo_green });
  }

  _handleOut () {
    console.log("out");
    this.setState({image: logo });
  }

  componentDidMount() {

    if(!localStorage.getItem("jwt")) {
      return;
    }

    const token = "Bearer " + localStorage.getItem("jwt");
    console.log(token);

    axios({method: 'get', url: serverURL("/current_user"), headers: {'Authorization': token }})
    .then(response => {
      this.setState({ user: response.data })
    })
    .catch(error => console.log('error', error));

  }
  randomImg () {
    const images = [ avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9 ];
    const max = images.length;
    const randomNum = Math.floor(Math.random() * max);
    return images[randomNum];
  }


  render() {
    const profileImg = this.randomImg();
    return (
      <div className="nav">
        <Link to={ '/' } className="headerTitle"><h1 onMouseOver={ this._handleHover } onMouseOut={ this._handleOut } >greenify<img src={ logo } className="logo nohover" /><img src={ logo_green } className="logo hover" /></h1></Link>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          { this.state.user.is_seller ? <Link to="/plants/new">Add Plant</Link> : "" }
          <Link to="/quiztest">Quiz</Link>
          { this.state.user.admin ? <Link to="/users">Users</Link> : "" }
          <Link to="/quiz1">Quiz1</Link>


          { localStorage.getItem("jwt") ?
              <span>
              <Link to={"/users/" + this.state.user.id} >
                <img className="avatar" src={ profileImg } width="50" height="50" />
                { this.state.user.name }
               </Link>
              <Link to="/SignOut">Sign Out</Link></span>
              :
              <span><Link to="/SignIn">Sign In</Link> or
              <Link to="/SignUp"> Sign Up</Link></span>
          }

        </div>
      </div>)
  }
}

export default Header;
