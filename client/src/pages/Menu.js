import React from 'react';
import ItemList from '../components/ItemList';
import CategoryMenu from '../components/CategoryMenu';
import Cart from '../components/Cart';

const Menu = () => (
  <div className="container">
    <CategoryMenu />

    <ItemList />

    <Cart />
  </div>
);

export default Menu;
