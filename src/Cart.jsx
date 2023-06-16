import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItemFromCart, setCartItems } from './store';
import './cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleDelete = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };


  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);


  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      dispatch(setCartItems(parsedCartItems));
    }
  }, [dispatch]);



  const handleIncrement = (item) => {
    dispatch(incrementQuantity(item.id));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(decrementQuantity(item.id));
    }
  };

 
  return (
    <div className="cart">
      {cartItems.length === 0 ? (
        <h1 className='emp'>Cart is Empty📪</h1>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="item-details">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <h4 className="price">${Math.round(item.price * item.quantity)}</h4>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{String(item.quantity)}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <button onClick={() => handleDelete(item.id)} className="del">
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </div>
            </div>
          ))}
          <p>
            <b>Total Price:</b> ${Math.floor(
              cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
            )}.00
          </p>
          <button className="buy-button">Buy Now</button>
        </>
      )}
    </div>
  );
};

export default Cart;
