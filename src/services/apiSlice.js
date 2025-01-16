import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'https://jn549f8x-8000.inc1.devtunnels.ms';
export const apiSlice = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/user`,
    prepareHeaders: (headers, {getState}) => {
      const token = getState().authComponent.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const {middleware: mainApiMiddleware} = apiSlice;
