import { createSlice } from '@reduxjs/toolkit';
const url = '/offers';

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
   cart:[],
   isCartOpen: false,
   offersItems:[]
  },
  reducers: {
   addToCart: (state,action) => {
   
     
     state.cart.push(action.payload)
   },
   resetCart: (state,action) => {
     state.cart = [];
   },
   toggleCart: (state,action) => {
     state.isCartOpen = !state.isCartOpen
   },
   fetchOffers: (state, action) => {
     state.offersItems = action.payload;
   }
  }
});

export const { addToCart, resetCart, toggleCart, fetchOffers } = shopSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchOfferItems = () => async dispatch => {
  let res = await fetch(url);
  let data = await res.json();
  //console.log(data.pics);
  dispatch(fetchOffers(data));
  
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value;

export default shopSlice.reducer;
