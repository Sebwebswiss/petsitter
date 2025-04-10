import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const clientApiSlice = createApi({
  reducerPath: 'clientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('client_token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['USER', 'CLIENT'],
  endpoints: (builder) => ({}),
});
