import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function Navbar() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">Order History</Link>
          </li>
          <li className="mx-1">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    }
    return (
      <ul className="flex-row">
        <li className="mx-1">
          <Link to="/signup">Signup</Link>
        </li>
        <li className="mx-1">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    );
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="taco">
            {' '}
            🌮{' '}
          </span>
          Full Stack Taco Shop
        </Link>
      </h1>
      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Navbar;
