import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cardSlice';
import { api } from '../services/Api';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    [api.reducerPath]: api.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
