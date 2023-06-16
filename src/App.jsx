import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store';
import ProductList from './ProductList';
import Nav from './Nav';
import Cart from './Cart'; 
// import { useEffect } from 'react';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Nav />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
