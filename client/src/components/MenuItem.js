import React from 'react';
import { Link } from 'react-router-dom';
import { idbPromise } from '../utils/helpers';
import { useStoreContext } from '../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../utils/actions';

function MenuItem(foodItem) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, description } = foodItem;

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
    <div className="col s12 m6 l3">
      <div className="card large">
        <div className="card-image">
          <Link to={`/items/${_id}`}>
            <img alt={name} src={`/images/${image}`} />
          </Link>
        </div>
        <div className="card-content">
          <span className="card-title">{name}</span>
          <p>{description}</p>
          <p>${price}.00</p>
        </div>
        <div className="card-action">
          <button type="button" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
