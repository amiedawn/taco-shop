import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
import CartItem from './CartItem';
import Auth from '../utils/auth';
import { useStoreContext } from '../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../utils/actions';
import { idbPromise } from '../utils/helpers';
import { QUERY_CHECKOUT } from '../utils/queries';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({
        type: ADD_MULTIPLE_TO_CART,
        items: [...cart],
      });
    }

    if (!state.cart) {
      getCart();
    }
  }, [state.cart, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((foodItem) => {
      sum += foodItem.price * foodItem.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const itemIds = [];

    state.cart.forEach((foodItem) => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < foodItem.purchaseQuantity; i++) {
        itemIds.push(foodItem._id);
      }
    });

    getCheckout({
      variables: { items: itemIds },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed center-align vertical-align" onClick={toggleCart}>
        <i className="fas fa-shopping-cart" style={{ color: 'var(--navy)' }} />
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((foodItem) => (
            <CartItem key={foodItem._id} foodItem={foodItem} />
          ))}
          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            {Auth.loggedIn() ? (
              <button type="button" onClick={submitCheckout}>
                Checkout
              </button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <p>You haven't added anything to your cart yet... aren't you hungry?</p>
      )}
    </div>
  );
};

export default Cart;
