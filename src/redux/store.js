import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore } from 'redux-persist';
import authSlice from './slice/authSlice';

const rootReducer = combineReducers({
  // user: userReducer,
  auth: authSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
