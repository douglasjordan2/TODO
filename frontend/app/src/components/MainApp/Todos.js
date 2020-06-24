import React, { Component } from 'react'

export class Todos extends Component {
  updateComplete = id => {
    console.log(id)
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
      justifyContent: 'space-between'
    }

    return (
      <div style = { container }>
        { this.props.todos.map(todo => (
          <div style = { todoStyle }>
            <span>Task: { todo.task }</span>
            <span>
              <input 
                type="checkbox"
                onChange = { () => this.updateComplete(todo.id) }
              />
              Complete? 
            </span>
          </div>
        )) }
      </div>
    )
  }
}

export default Todos
