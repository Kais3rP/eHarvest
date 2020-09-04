import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './slices/shopSlice';
import userReducer from './slices/userSlice';




export default configureStore({
  reducer: {
    shop: shopReducer,
    user: userReducer
},
});
