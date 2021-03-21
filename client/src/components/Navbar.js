import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function Navbar() {
  function showNavigation() {
    //   if (Auth.loggedIn()) {
    //     return (
    //       <ul className="flex-row">
    //         <li>
    //           <Link to="/orderHistory">Order History</Link>
    //         </li>
    //         <li>
    //           <Link to="/Menu">Menu</Link>
    //         </li>
    //         <li>
    //           <Link to="/contact">Contact Us</Link>
    //         </li>
    //         <li>
    //           {/* this is not using the Link component to logout or user and then refresh the application to the start */}
    //           <a href="/" onClick={() => Auth.logout()}>
    //             Logout
    //           </a>
    //         </li>
    //       </ul>
    //     );
    //   }

    return (
      <nav>
        <div className="nav-wrapper">
          <ul className="flex-row orange" width="100%">
            {/* Only shows order history if logged in, only shows login if not logged in */}
            {Auth.loggedIn() ? (
              <li>
                {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                <a href="/" onClick={() => Auth.logout()}>
                  Logout
                </a>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {/* Only shows logout if logged in, only shows login if not logged in */}
            {Auth.loggedIn() ? (
              <li>
                <Link to="/orderHistory">Order History</Link>
              </li>
            ) : (
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            )}
            <li>
              <Link to="/Menu">Menu</Link>
            </li>
            <li>
              <Link to="/aboutUs">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <header className="flex-row">
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
