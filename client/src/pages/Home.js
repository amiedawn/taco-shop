import React from 'react';
// import ItemList from '../components/ItemList';
// import CategoryMenu from '../components/CategoryMenu';
// import 'materialize-css';
// import {Parallax} from 'react-materialize';
import Cart from '../components/Cart';
import Ingredients from '../assets/ingredients.jpeg';

const Home = () => (
               <div>
    <div>
      <img src={Ingredients} alt="taco ingredients" width="100%" />
    </div>
    <div className="section no-pad-bot">
      <div className="container">
        <h1 className="header center">Exciting Home page coming soon</h1>
        <div className="row center">
          <h5 className="header col s12 light">clever sayings and large images</h5>
        </div>
    </div>
  </div>
    <Cart />
  </div>
);

export default Home;
