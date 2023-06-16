import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './card.css'; // Import the CSS file for Nav styles

const Nav = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [shakeCart, setShakeCart] = useState(false);

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
        {cartItems.length > 0 ? <sup>{cartItems.length}</sup> : <sup>0</sup>}
      </Link>
    </div>
  );
};

export default Nav;
