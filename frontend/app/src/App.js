import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import TodoApp from './components/MainApp/TodoApp';
import PrivateRoute from './components/auth/PrivateRoute';

export default function App() {
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
        <h1>Javascript Interview</h1>
        <Route exact path="/" exact component = { Home }  />
        <Route exact path="/login" exact component = { Login }  />
        <Route exact path="/register" exact component = { Register }  />
        <PrivateRoute exact path="/todo" exact component = { TodoApp }  />
      </div>
    </Router>
  );
}

