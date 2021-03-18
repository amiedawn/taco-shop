import React from 'react';
import ItemList from '../components/ItemList';
import CategoryMenu from '../components/CategoryMenu';
import Cart from '../components/Cart';

const Home = () => (
  <div className="container">
    <CategoryMenu />
    <ItemList />
    <Cart />
  </div>
);

export default Home;
