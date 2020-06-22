import React, { Component } from 'react'

export class Login extends Component {
  state = {
    creds: {
      username: '',
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

    const { username, password } = this.state.creds;

    // axios call

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
          placeholder="username"
          name="username"
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
