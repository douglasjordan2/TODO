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
        this.setState({ todo: { ...this.state.todo, completed: false } })
      })
      .catch(err => console.log('in error \n', err))

    return this.props.updateTodos()
  }

  render() {
    const form = {
      display: 'flex',
      flexDirection: 'column',
    }

    const h3 = { 
      margin: '0 0 10px 0' 
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

    const label = { 
      margin: '5px' 
    }

    const submit = {
      width: '50%',
      margin: '10px auto',
      padding: '5px'
    }

    return (
      <form 
        style = { form }
        onSubmit = { this.handleSubmit }
        id="form"
      >
        <h3 style = { h3 }>Add TODO</h3>
        <div style = { flex }>
          <input 
            name="task"
            placeholder="Task"
            style = { input }
            onChange = { this.handleChange }
          />
          <div style = { column }>
            <label style = { label }>
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
        <input 
          type="submit" 
          style = { submit }
        />
      </form>
    )
  }
}

export default Form
