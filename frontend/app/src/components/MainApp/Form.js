import React, { Component } from 'react';
import axiosWithAuth from '../auth/withAuth';

export class Form extends Component {
  state = {
    todo: {
      task: '',
      completed: false
    }
  }

  handleChange = e => {
    this.setState({
      todo: {
        ...this.state.todo,
        [e.target.name]: e.target.value
      }
    })
  }

  updateCompleted = e => {
    this.setState({
      todo: {
        ...this.state.todo,
        completed: e.target.checked
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    const user = localStorage.getItem('user');

    axiosWithAuth()
      .post('http://localhost:5000/api/todos', {...this.state.todo, user_id: user})
      .then(() => {
        document.querySelector('#form').reset();
      })
      .catch(err => console.log('in error \n', err))

    return this.props.updateTodos()
  }

  render() {
    const form = {
      display: 'flex',
      flexDirection: 'column'
    }

    const flex = {
      display: 'flex',
      justifyContent: 'space-between',
      height: '100%'
    }

    const input = {
      width: '60%',
      marginRight: '20px'
    }

    const column = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '40%',
    }

    return (
      <form 
        style = { form }
        onSubmit = { this.handleSubmit }
        id="form"
      >
        <h3 style = {{ margin: '0 0 20px 0' }}>Add TODO</h3>
        <div style = { flex }>
          <input 
            name="task"
            placeholder="Task"
            style = { input }
            onChange = { this.handleChange }
          />
          <div style = { column }>
            <label style = {{ margin: '5px' }}>
              <input 
                type="checkbox" 
                name="completed" 
                checked = { this.state.todo.completed }
                onChange = { this.updateCompleted }
              />
              Complete?
            </label>
          </div>
        </div>
        <input type="submit" />
      </form>
    )
  }
}

export default Form
