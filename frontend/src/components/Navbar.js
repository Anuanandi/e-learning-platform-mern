// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, logout }) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <>
          <Link to="/courses">Courses</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;