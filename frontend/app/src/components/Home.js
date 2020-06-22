import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Link to="/login">Login</Link>
      &nbsp;
      <span>|</span>
      &nbsp;
      <Link to="/register">Signup</Link>
    </div>
  )
}

export default Home;