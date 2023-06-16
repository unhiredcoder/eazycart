import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (item && item.quantity > 0) {
        item.quantity -= 1;
      }
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    }
  }
});

export const {
  addItemToCart,
  decrementQuantity,
  incrementQuantity,
  removeItemFromCart,
  setCartItems
} = cartSlice.actions;

export default configureStore({
  reducer: {
    cart: cartSlice.reducer
  }
});
