import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/Api"; 
import cartReducer from '../redux/cardSlice'; 

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, 
    cart: cartReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), 
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch; 