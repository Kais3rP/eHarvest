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
    mostSoldItems:[],
    vegetables:[],
    fruit:[]
  },
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload)
      for (let item of state.cart) {
        if (item.productName === action.payload.productName) {
          item.quantityInCart += 1;
          console.log(item.quantityInCart)
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
    fetchVegs: (state, action) => {
      state.vegetables = action.payload;
    },
    fetchFruit: (state, action) => {
      state.fruit = action.payload;
    },
    calculateTotalPrice: (state, action) => {
      state.totalPrice += action.payload
    }
  }
});

export const { addToCart, resetCart, toggleCart, fetchOffers, fetchMostSold, calculateTotalPrice, openHeaderModal, closeHeaderModal, fetchVegs, fetchFruit } = shopSlice.actions;

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
///Helper functions:
function findTenMostSold(arr){
  return arr.sort((a,b)=> b.sold - a.sold)
               .slice(0,10)
 }


 function findTenCheapest(arr){

  return arr.sort((a,b)=> a.price - b.price)
                      .slice(0,10)   
 }

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value;

export default shopSlice.reducer;
