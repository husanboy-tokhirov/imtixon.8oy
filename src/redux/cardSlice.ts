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

// Initial state
const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

// Simulate an API call to fetch cart items using a timeout
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
    }, 1000); // Simulating network delay of 1 second
  });
};

// Thunk action to fetch cart items without Axios
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const data = await mockFetchCartItems(); // Call the mock API
      return data; // Return the mocked data
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
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
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
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the cart actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// Export the cart reducer to use it in the store
export default cartSlice.reducer;
