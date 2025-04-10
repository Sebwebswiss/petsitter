import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '../slices/authSlice';
import { authApi } from '@/features/authApi';
import { blogsApi } from '@/features/blogsApi';
import { apiSlice } from '@/slices/apiSlice'; 
import { clientApiSlice } from '@/slices/clientApiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [clientApiSlice.reducerPath]: clientApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(authApi.middleware)
      .concat(blogsApi.middleware)
      .concat(clientApiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
