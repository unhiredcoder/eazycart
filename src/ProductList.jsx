import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart,setCartItems } from './store';
import './card.css';

const ProductList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
  }, []);

  const handleAddToCart = (item) => {
    const { price, title, id, image, description } = item;
    const itemInCart = cartItems.find((cartItem) => cartItem.id === id);
    if (itemInCart) {
      alert('Item already in the cart');
    } else {
      dispatch(addItemToCart({ id, price, title, image, description, quantity: 1 }));
    }
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



  return (
    <div>
      {isLoading ? (
        <div className="loading">
          <img src="./loader.svg" alt="" />
        </div>
      ) : (
        <div className="container">
          {items.map((item, index) => (
            <div className="card" key={index}>
              <div className="imgBox">
                <img className="mouse" src={item.image} alt={item.title} />
              </div>
              <div className="contentBox">
                <h5>{item.title}</h5>
                <h6 className="category">Category: {item.category}</h6>
                <h2 className="price">${item.price.toFixed(1)}</h2>
                <button onClick={() => handleAddToCart(item)} className="buy">
                  <ion-icon name="cart-outline"></ion-icon>
                </button>
                <button className="buy2">
                  <ion-icon name="share-social-outline"></ion-icon>
                </button>
                <button className="buy3">
                  <ion-icon name="heart-outline"></ion-icon>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
