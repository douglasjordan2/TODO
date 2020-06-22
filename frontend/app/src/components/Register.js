import React, { Component } from 'react';
import axios from 'axios';

export class Register extends Component {
  state = {
    creds: {
      email: '',
      password: ''
    }
  }

  handleChange = e => {
    this.setState({
      creds: {
        ...this.state.creds,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state.creds;

    // axios call
    axios
    .post('http://localhost:5000/api/register', {email, password})
    .then(res => {
      console.log(res)
      localStorage.setItem("token", res.data.token)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    const form = {
      display: 'flex',
      flexDirection: 'column'
    }

    const input = {
      margin: '5px 0',
      padding: '5px'
    }

    return (
      <form 
        style = { form }
        onSubmit = { this.handleSubmit }
      >
        <input 
          type="text"
          onChange = { this.handleChange }
          placeholder="Email"
          name="email"
          style = { input }
        />
        <input 
          type="password"
          onChange = { this.handleChange }
          placeholder="password"
          name="password"
          style = { input }
        />
        <input 
          type="submit"
          style = { input }
        />
      </form>
    )
  }
}

export default Register
