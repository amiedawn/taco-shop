import React from 'react';
// import ItemList from '../components/ItemList';
// import CategoryMenu from '../components/CategoryMenu';
import Cart from '../components/Cart';

const Home = () => (
  <div id="index-banner" className="parallax-container">
    <div className="section no-pad-bot">
      <div className="container">
        <h1 className="header center teal-text text-lighten-2">Parallax Template</h1>
        <div className="row center">
          <h5 className="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
        </div>
        <div className="row center">
          {/* <a
          href="http://materializecss.com/getting-started.html" 
          id="download-button" 
          className="btn-large waves-effect waves-light teal lighten-1">
            Get Started
          </a> */}
        </div>
      </div>
    </div>
    <div className="parallax">
      <img src="ingredients.jpeg" alt="taco ingredients" />
    </div>
    <Cart />
  </div>
);

export default Home;
