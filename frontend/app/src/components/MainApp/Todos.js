import React, { Component } from 'react';
import axiosWithAuth from '../auth/withAuth';

export class Todos extends Component {
  state = {
    updateTask: false,
    newTask: ''
  }

  update = todo => {
    axiosWithAuth()
      .put(`http://localhost:5000/api/todos/${todo.id}`, todo)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    
    this.setState({ updateTask: false, newTask: '' })

    return this.props.updateTodos()
  }

  delete = id => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))

    this.setState({ updateTask: false, newTask: '' })

    return this.props.updateTodos()
  }

  render() {
    const container = {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'scroll',
      marginTop: '10px',
      maxHeight: '100%'
    }

    const todoStyle = {
      border: '1px solid black',
      padding: '10px',
      marginTop: '5px',
      display: 'flex',
      flexDirection: 'column'
    }

    const pushRight = { 
      marginRight: '5px' 
    }

    const italic = { 
      fontStyle: 'italic' 
    }

    const task = completed => ({ 
      marginLeft: '5px', 
      textDecoration: completed ? 'line-through' : 'none', 
      fontStyle: 'normal' 
    })

    const under = {
      marginTop: '10px',
      display: 'flex',
      justifyContent: 'space-between'
    }

    const _edit = { 
      color: 'blue', 
      cursor: 'pointer', 
      marginRight: '10px' 
    }

    const _delete = { 
      color: 'red', 
      cursor: 'pointer' 
    }

    return (
      <div style = { container }>
        { this.props.todos.map(todo => (
          <div 
            style = { todoStyle }
            key = { todo.id }  
          >
            { this.state.updateTask === todo.id ?
              <form
                onSubmit = { e => {
                  e.preventDefault();
                  this.update({ ...todo, task: this.state.newTask }) 
                } }
              >
                <span style = { pushRight }>Task:</span> 
                <input 
                  placeholder = { todo.task }
                  onChange = { e => this.setState({ newTask: e.target.value }) }
                />
              </form>
            :
              <span style = { italic }>
                Task: 
                <span style = { task(todo.completed) }>
                  { todo.task }
                </span>
              </span>
            }
            <div style = { under }>
              <span>
                <input 
                  type="checkbox"
                  checked = { todo.completed }
                  onChange = { () => this.update({...todo, completed: !todo.completed }) }
                />
                Complete? 
              </span>
              <div>
                <span
                  style = { _edit }
                  onClick = { () => this.setState({ updateTask: todo.id }) }
                >
                  Edit
                </span>
                <span 
                  style = { _delete }
                  onClick = { () => this.delete(todo.id) }
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
        )) }
      </div>
    )
  }
}

export default Todos
