import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function Navbar() {
  function showNavigation() {
    //   if (Auth.loggedIn()) {
    //     return (
    //       <ul className="flex-row">
    //         <li className="mx-1">
    //           <Link to="/orderHistory">Order History</Link>
    //         </li>
    //         <li className="mx-1">
    //           <Link to="/Menu">Menu</Link>
    //         </li>
    //         <li className="mx-1">
    //           <Link to="/contact">Contact Us</Link>
    //         </li>
    //         <li className="mx-1">
    //           {/* this is not using the Link component to logout or user and then refresh the application to the start */}
    //           <a href="/" onClick={() => Auth.logout()}>
    //             Logout
    //           </a>
    //         </li>
    //       </ul>
    //     );
    //   }

    return (
      <div className="nav-wrapper" >
      <ul className="flex-row orange">
        {/* Only shows order history if logged in, only shows login if not logged in */}
        {Auth.loggedIn() ? (
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        ) : (
          <li className="mx-1">
            <Link to="/login">Login</Link>
          </li>
        )}
        {/* Only shows logout if logged in, only shows login if not logged in */}
        {Auth.loggedIn() ? (
          <li className="mx-1">
            <Link to="/orderHistory">Order History</Link>
          </li>
        ) : (
          <li className="mx-1">
            <Link to="/signup">Signup</Link>
          </li>
        )}
        <li className="mx-1">
          <Link to="/Menu">Menu</Link>
        </li>
        <li className="mx-1">
          <Link to="/aboutUs">About Us</Link>
        </li>
        <li className="mx-1">
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>
      </div>
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
