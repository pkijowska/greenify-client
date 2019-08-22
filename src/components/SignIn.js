import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import serverURL from "../ServerURL";


class SignIn extends Component {
  constructor () {
    super();
    this.state = {
      // Update state values with input field as user makes changes through functions below (_handleInput...)
      name: "",
      email: "",
      password: "",
      error: ""
    }

    // Bind all functions that use 'this'
    this._handleSumbit = this._handleSumbit.bind(this);
    this._handleInputEmail = this._handleInputEmail.bind(this);
    this._handleInputPassword = this._handleInputPassword.bind(this);

  }

  _handleSumbit (event) {
    event.preventDefault();
    // AJAX post request to create user.
    const url = serverURL("api/user_token");
    axios.post(url, {
      auth: {
        email: this.state.email,
        password: this.state.password,
      }
    })
    .then((results) => {
      console.log(results.data);
      this.setState({error: ""})
      console.log(window)
      localStorage.setItem("jwt", results.data.jwt);
      this.props.history.push("/");
      window.location.reload();
    })
    .catch(error => {
      console.log('error', error);
      this.setState({error: "Try Again."})
    });;
  }

  _handleInputEmail (event) {
    this.setState({
      email: event.target.value,
    });
  }

  _handleInputPassword (event) {
    this.setState({
      password: event.target.value,
    });
  }

  render() {
    return (
      <div className="centerForm">
        <form onSubmit={ this._handleSumbit } >
          <label htmlFor="email">
            Email:
            <input type="email" id="email" onChange={ this._handleInputEmail } />
          </label>

          <label htmlFor="password">
            Password:
            <input type="password" id="password" onChange={ this._handleInputPassword } />
          </label>

          <input type="submit" value="Sign In" />
          <p>{this.state.error}</p>
        </form>
      </div>)
  }
}

export default SignIn;
