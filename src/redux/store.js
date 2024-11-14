import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore } from 'redux-persist';
import cartSlice from './slice/cartSlice';
import shopSlice from './slice/shopSlice';

const rootReducer = combineReducers({
    // user: userReducer,
    // auth: authSlice,
    cart: cartSlice,
    shop: shopSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});

export const persistor = persistStore(store);
