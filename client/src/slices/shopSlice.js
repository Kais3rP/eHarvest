import { createSlice } from '@reduxjs/toolkit';
const itemsURL = '/api/products';
/*const mostSoldURL = '/api/mostsold';
const vegsURL = '/api/vegs';
const fruitURL = '/api/fruit';*/

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    isCartOpen: false,
    isHeaderModalOpen: false,
    cart: [],
    totalPrice: 0,
    offersItems: [],
    mostSoldItems: [],
    vegetables: [],
    fruit: []
  },
  reducers: {
    addToCart: (state, action) => {
      for (let item of state.cart) {
        if (item.productName === action.payload.productName && item.sellerName === action.payload.sellerName) {
          item.quantityInCart += 1;
          return;
        }
      }
      state.cart.push(action.payload)
    },
    increaseCart: (state, action) => {
      for (let item of state.cart) {
        if (item.productName === action.payload.productName && item.sellerName === action.payload.sellerName) {
          item.quantityInCart += 1;
        }
      }
    },
    decreaseCart: (state, action) => {
      
      for (let item of state.cart) {
        if (item.productName === action.payload.productName && item.sellerName === action.payload.sellerName) {
          if (item.quantityInCart === 0) return;
          item.quantityInCart -= 1;
        }
      }
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
    fetchVegs: (state, action) => {
      state.vegetables = action.payload;
    },
    fetchFruit: (state, action) => {
      state.fruit = action.payload;
    },
    calculateTotalPrice: (state, action) => {
      let total = 0;
      for (let item of state.cart) {
      total+=item.price*item.quantityInCart
      
      };
      state.totalPrice = total;
    }
  }
});

export const {  addToCart,
                resetCart,
                toggleCart,
                fetchOffers,
                fetchMostSold,
                calculateTotalPrice,
                openHeaderModal,
                closeHeaderModal,
                fetchVegs,
                fetchFruit,
                increaseCart,
                decreaseCart } = shopSlice.actions;

//Thunks
export const fetchItems = () => async dispatch => {
  let res = await fetch(itemsURL);
  let data = await res.json();
  let vegs = [];
  let fruit = [];
  let mostSold = findTenMostSold(data);
  let offers = findTenCheapest(data);

  for (let item of data) {
    item.quantityInCart = 1;  //Adds the cart quantity property
    item.price = parseFloat(item.price);  //converts the price string to number
    if (item.type === 'vegetables') vegs.push(item);
    if (item.type === 'fruit') fruit.push(item);
  }

  dispatch(fetchOffers(offers));
  dispatch(fetchMostSold(mostSold));
  dispatch(fetchVegs(vegs));
  dispatch(fetchFruit(fruit));

};

export const fetchLogin = () => async dispatch => {

}
///Helper functions:
function findTenMostSold(arr) {
  return arr.sort((a, b) => b.sold - a.sold)
    .slice(0, 10)
}


function findTenCheapest(arr) {

  return arr.sort((a, b) => a.price - b.price)
    .slice(0, 10)
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value;

export default shopSlice.reducer;
