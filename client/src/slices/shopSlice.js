import { createSlice } from '@reduxjs/toolkit';
const offersURL = '/offers';
const mostSoldURL = '/mostsold';

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    isCartOpen: false,
    isHeaderModalOpen: false,
    cart: [],
    totalPrice: 0,
    offersItems: [],
    mostSoldItems:[],
    vegetables:[],
    fruit:[]
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
    openHeaderModal: (state, action) => {
      state.isHeaderModalOpen = true;
    },
    closeHeaderModal: (state, action) => {
      console.log('ok');
      state.isHeaderModalOpen = false;
    },
    fetchOffers: (state, action) => {
      state.offersItems = action.payload;
    },
    fetchMostSold: (state, action) => {
      state.mostSoldItems = action.payload;
    },
    calculateTotalPrice: (state, action) => {
      state.totalPrice += action.payload
    }
  }
});

export const { addToCart, resetCart, toggleCart, fetchOffers, fetchMostSold, calculateTotalPrice, openHeaderModal, closeHeaderModal } = shopSlice.actions;

//Thunks
export const fetchOfferItems = () => async dispatch => {
  let res = await fetch(offersURL);
  let data = await res.json();
  for (let item of data) item.quantityInCart = parseInt(item.quantityInCart);
  dispatch(fetchOffers(data));

};
export const fetchMostSoldItems = () => async dispatch => {
  let res = await fetch(mostSoldURL);
  let data = await res.json();
  console.log(data)
  for (let item of data) item.quantityInCart = parseInt(item.quantityInCart);
  dispatch(fetchMostSold(data));

};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value;

export default shopSlice.reducer;
