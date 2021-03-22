import React from 'react';
import ItemList from '../components/ItemList';
import CategoryMenu from '../components/CategoryMenu';
import Cart from '../components/Cart';
import Auth from '../utils/auth';

const Menu = () => (
  <div className="container">
    { Auth.loggedIn() ? null : (
      <h3>Please log in to add items to cart</h3>
    )}
    <CategoryMenu />
    <ItemList />
    <Cart />
  </div>
);

export default Menu;
