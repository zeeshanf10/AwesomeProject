import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from './apiSlice';
// import { tokenRefresher } from './middleware/tokenRefresher';
import {rtkQueryErrorLogger} from './middleware/errorLogger';
import authComponentReducer from './Auth/AuthComponentSlice';

export const store = configureStore({
  reducer: {
    authComponent: authComponentReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // Add API reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(rtkQueryErrorLogger, apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Replace ReturnType and type annotations with functional equivalents
export const getState = () => store.getState();
export const dispatch = store.dispatch;
