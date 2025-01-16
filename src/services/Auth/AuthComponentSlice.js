import { createSlice } from '@reduxjs/toolkit';
import { clearToken, getObject, getToken, removeItem, saveToken, setObject } from '../tokenStorage';

// Retrieve stored token and account information from local storage
const lsToken = getToken();
const lsAccount = getObject('account');

const initialState = {
  authComponent: 'signIn',
  account: lsAccount || undefined,
  token: lsToken || undefined,
  isOnBoarded: 3,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthComponent: (state, action) => {
      state.authComponent = action.payload;
    },
    setOnboarded: (state, action) => {
      state.isOnBoarded = action.payload;
    },
    resetAuthComponent: (state) => {
      state.authComponent = 'signIn';
    },
    setCredentials: (state, action) => {
      const { accessToken } = action.payload.token;
      const { account } = action.payload;
      state.token = accessToken;
      state.account = account;
      saveToken(accessToken);
      setObject('account', account);
    },
    removeCredentials: (state) => {
      state.token = undefined;
      state.account = undefined;
      clearToken();
      removeItem('account');
    },
    updateToken: (state, action) => {
      state.token = action.payload.accessToken;
      saveToken(action.payload.accessToken);
    },
    removeToken: (state) => {
      state.token = undefined;
      clearToken();
    },
  },
});

export const {
  setAuthComponent,
  setOnboarded,
  resetAuthComponent,
  setCredentials,
  removeCredentials,
  updateToken,
  removeToken,
} = authSlice.actions;

export default authSlice.reducer;

export const getAuthComponentState = (state) => state.authComponent;
