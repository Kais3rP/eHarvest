import { createSlice } from '@reduxjs/toolkit';
const url = '/offers';

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    cart: [],
    totalPrice: 0,
    isCartOpen: false,
    offersItems: []
  },
  reducers: {
    addToCart: (state, action) => {
      for (let item of state.cart) {
        if (item.id === action.payload.id) {
          item.quantityInCart += 1;
          return;
        }
      }
      state.cart.push(action.payload)
    },
    resetCart: (state, action) => {
      state.cart = [];
    },
    toggleCart: (state, action) => {
      state.isCartOpen = !state.isCartOpen
    },
    fetchOffers: (state, action) => {
      state.offersItems = action.payload;
    },
    calculateTotalPrice: (state, action) => {
      state.totalPrice += action.payload
    }
  }
});

export const { addToCart, resetCart, toggleCart, fetchOffers, calculateTotalPrice } = shopSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchOfferItems = () => async dispatch => {
  let res = await fetch(url);
  let data = await res.json();
  for (let item of data) item.quantityInCart = parseInt(item.quantityInCart);
  dispatch(fetchOffers(data));

};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value;

export default shopSlice.reducer;
