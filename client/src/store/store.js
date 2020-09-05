import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import shopReducer from '../slices/shopSlice';
import userReducer from '../slices/userSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['shop']
}
const rootReducer = combineReducers({
  shop: shopReducer,
  user: userReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);


 
const store = configureStore({
  reducer: persistedReducer,
devTools: true
});

const persistor = persistStore(store);
export { store, persistor };