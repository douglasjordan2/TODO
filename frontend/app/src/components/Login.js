import React, { Component } from 'react';
import axios from 'axios';

export class Login extends Component {
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

    axios
      .post('http://localhost:5000/api/login', this.state.creds)
      .then(res => {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem('user', res.data.userId)
      })
      .then(() => this.props.history.push('/todo'))
      .catch(err => {
        console.log("in error")
        if(err) {
          localStorage.removeItem("token")
        }
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
          placeholder="email"
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

export default Login
