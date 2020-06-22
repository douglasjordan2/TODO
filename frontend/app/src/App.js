import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';

class App extends Component {
  render() {
    const page = {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    }

    return (
      <Router>
        <div style = { page }>
          <h1>TODO App - Javascript Interview</h1>
          <Route exact path="/" exact component = { Home }  />
          <Route exact path="/login" exact component = { Login }  />
          <Route exact path="/register" exact component = { Register }  />
          {/* <Route exact path="/todo" exact component = { Todo }  /> */}
        </div>
      </Router>
    );
  }
}

export default App;

