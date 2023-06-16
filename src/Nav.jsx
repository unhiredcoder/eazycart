import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from './store';
import { Link } from 'react-router-dom';
import './card.css';

const Nav = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [shakeCart, setShakeCart] = useState(false);


  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      dispatch(setCartItems(parsedCartItems));
    }
  }, [dispatch]);

  useEffect(() => {
    if (cartItems.length > 0) {
      setShakeCart(true);
      setTimeout(() => {
        setShakeCart(false);
      }, 500);
    }
  }, [cartItems]);

  return (
    <div className="nav">
      <h1 className="title">
        <span>🛒</span>EazyCart
      </h1>
      <Link className={`Link ${shakeCart ? 'shake' : ''}`} to="/cart">
        <ion-icon name="bag-handle"></ion-icon>
        <sup>{cartItems.length}</sup>
      </Link>
    </div>
  );
};

export default Nav;
