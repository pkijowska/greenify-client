import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import serverURL from "../ServerURL";


class SignUp extends Component {
  constructor () {
    super();
    this.state = {
      // Update state values with input field as user makes changes through functions below (_handleInput...)
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      seller: false,
    }

    // Bind all functions that use 'this'
    this._handleSumbit = this._handleSumbit.bind(this);
    this._handleInputName = this._handleInputName.bind(this);
    this._handleInputEmail = this._handleInputEmail.bind(this);
    this._handleInputPassword = this._handleInputPassword.bind(this);
    this._handleInputPasswordConfirmation = this._handleInputPasswordConfirmation.bind(this);
    this._handleInputSeller = this._handleInputSeller.bind(this);
  }

  _handleSumbit (event) {
    event.preventDefault();
    // AJAX post request to create user.
    const url = serverURL("/api/users");
    axios.post(url, {
      user: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.confirm_password,
        is_seller: this.state.seller
      }
    }).then((results) => {
      console.log(results);
      // TODO: After they sign up, logthem in and redirect to home.

        // AJAX post request to create user.
        const loginURL = serverURL("api/user_token");
        axios.post(loginURL, {
          auth: {
            email: this.state.email,
            password: this.state.password,
          }
        })
        .then((results) => {
          console.log(results.data);
          console.log(window)
          localStorage.setItem("jwt", results.data.jwt);
          this.props.history.push("/");
          window.location.reload();
        })
        .catch(error => console.log('error', error));
    });
  }

  // Use event value to update state value with text user inputs in field
  _handleInputName (event) {
    this.setState({
      name: event.target.value,
    });
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

  _handleInputPasswordConfirmation (event) {
    this.setState({
      confirm_password: event.target.value,
    });
  }

  _handleInputSeller (event) {
    this.setState({
      seller: (this.state.seller ? false : true)
    });
  }

  render() {
    return (
      <div className="centerForm">
        <form onSubmit={ this._handleSumbit } >
          <label htmlFor="name">
            Name:
            <input type="text" id="name" onChange={ this._handleInputName } />
          </label>

          <label htmlFor="email">
            Email:
            <input type="email" id="email" onChange={ this._handleInputEmail } />
          </label>

          <label htmlFor="password">
            Password:
            <input type="password" id="password" onChange={ this._handleInputPassword } />
          </label>

          <label htmlFor="confirm_password">
            Confirm Password:
            <input type="password" id="confirm_password" onChange={ this._handleInputPasswordConfirmation } />
          </label>

          <label htmlFor="seller">
            Seller:
            <input type="checkbox" id="seller" onChange={ this._handleInputSeller } />
          </label>

          <input type="submit" value="Create User" />
        </form>
      </div>)
  }
}

export default SignUp;
