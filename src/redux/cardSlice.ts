import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import { api } from '../services/Api';

interface CartItem {
  id: number;
  name: string;
  selectedColor: string;
  size?: string;
  brand?: string;
  category?: string;
  quantity: number;
  price: number;
  imageLink: string;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemExists = state.items.find(item => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity += action.payload.quantity; 
      } else {
        state.items.push(action.payload); 
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          api.endpoints.getProducts.matchPending,
          api.endpoints.getProducts.matchFulfilled,
          api.endpoints.getProducts.matchRejected
        ),
        (state, action) => {
          if (api.endpoints.getProducts.matchPending(action)) {
            state.loading = true;
            state.error = null;
          } else if (api.endpoints.getProducts.matchFulfilled(action)) {
            state.loading = false;
          } else if (api.endpoints.getProducts.matchRejected(action)) {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch products';
          }
        }
      );
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
