import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  selectedColor: string;
  size?: string;
  brand?: string;
  category?: string;
  quantity: number;
  price: number;
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

const mockFetchCartItems = (): Promise<CartItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'Lipstick',
          selectedColor: '#FF5733',
          size: 'Medium',
          brand: 'Maybelline',
          category: 'Makeup',
          quantity: 2,
          price: 15.99,
        },
        {
          id: 2,
          name: 'Foundation',
          selectedColor: '#D4A5A5',
          size: 'Small',
          brand: 'Loreal',
          category: 'Makeup',
          quantity: 1,
          price: 22.49,
        },
      ]);
    }, 1000);
  });
};

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const data = await mockFetchCartItems();
      return data;
    } catch (error: any) {
      return rejectWithValue('Failed to fetch cart items');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCartItems.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
          state.items = action.payload;
          state.loading = false;
          localStorage.setItem('cartItems', JSON.stringify(state.items));
        })
        .addCase(fetchCartItems.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
