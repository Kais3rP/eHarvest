import { createSlice } from '@reduxjs/toolkit';

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
   cart:[],
   isCartOpen: false,

  },
  reducers: {
   addToCart: (state,action) => {
     for (let item of state.cart) if(item.id === action.payload.id) {
       item.numbers++;
       return;
     }
     state.cart.push({id:action.payload.id, pic:action.payload.pic, numbers: 1})
   },
   resetCart: (state,action) => {
     state.cart = [];
   },
   toggleCart: (state,action) => {
     state.isCartOpen = !state.isCartOpen
   }
  }
});

export const { addToCart, resetCart, toggleCart } = shopSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value;

export default shopSlice.reducer;
