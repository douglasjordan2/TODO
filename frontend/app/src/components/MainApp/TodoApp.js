import React, { Component } from 'react';

import Form from './Form';
import Todos from './Todos';

import axiosWithAuth from '../auth/withAuth';

export class TodoApp extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    this.updateTodos();
  }

  updateTodos = () => {
    const user_id = localStorage.getItem('user')
    axiosWithAuth()
      .get(`http://localhost:5000/api/users/${user_id}/todos`)
      .then(res => this.setState({ todos: res.data }))
      .catch(err => console.log(err))
  }

  logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    this.props.history.push('/')
  }

  render() {
    const container = {
      border: '2px solid black',
      width: '400px',
      height: '500px', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }

    const heading = {
      height: '10%',
      padding: '0 10px'
    }

    const h1 = {
      borderBottom: '1px solid black',
      padding: '0 10px'
    }

    const todosContainer = {
      height: '60%',
      padding: '10px'
    }

    const todoForm = {
      height: '20%',
      borderTop: '1px solid black',
      padding: '10px'
    }

    const logout = {
      color: 'blue',
      fontSize: '1.2rem',
      marginTop: '20px',
      cursor: 'pointer'
    }

    return (
      <>
        <div style = { container }>
          <div style = { heading }>
            <h1 style = { h1 }>TODOs</h1>
          </div>
          <div style = { todosContainer }>
            <Todos 
              todos = { this.state.todos }
              updateTodos = { this.updateTodos }
            />
          </div>
          <div style = { todoForm }>
            <Form 
              updateTodos = { this.updateTodos }
            />
          </div>
        </div>
        <span 
          style = { logout }
          onClick = { this.logout }
        >
          Logout
        </span>
      </>
    )
  }
}

export default TodoApp
