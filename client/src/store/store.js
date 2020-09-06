import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import shopReducer from '../slices/shopSlice';
import userReducer from '../slices/userSlice';
import uiReducer from '../slices/uiSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import localForage from 'localforage';
const persistConfig = {
  key: 'root',
  storage: localForage,
  blacklist: [uiReducer]
}
const rootReducer = combineReducers({
  shop: shopReducer,
  user: userReducer,
  ui: uiReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);


 
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({  //This is needed to get rid of error message of redux non serializable object
    serializableCheck: false,         //due to redux-persist
  }),
devTools: true
});

const persistor = persistStore(store);
export { store, persistor };