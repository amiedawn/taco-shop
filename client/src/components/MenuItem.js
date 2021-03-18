import React from 'react';
import { Link } from 'react-router-dom';
import { pluralize, idbPromise } from '../utils/helpers';
import { useStoreContext } from '../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../utils/actions';

function MenuItem(foodItem) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, quantity } = foodItem;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity, 10) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity, 10) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        item: { ...foodItem, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...foodItem, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/items/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div>
          {quantity} {pluralize('foodItem', quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      <button type="button" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default MenuItem;
