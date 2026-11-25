
import { createSlice } from "@reduxjs/toolkit";

// Initial shopping list state
const initialState = {
  items: [],
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,

  reducers: {
    // Add a new shopping item
    addItem: (state, action) => {
      state.items.push(action.payload);
    },

    // Edit an existing shopping item
    editItem: (state, action) => {
      const updatedItem = action.payload;

      const index = state.items.findIndex(
        (item) => item.id === updatedItem.id
      );

      if (index !== -1) {
        state.items[index] = updatedItem;
      }
    },

    // Delete a shopping item
    deleteItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    // Mark an item as bought or not bought
    toggleBought: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.bought = !item.bought;
      }
    },

    // Clear all purchased items
    clearBought: (state) => {
      state.items = state.items.filter(
        (item) => !item.bought
      );
    },
  },
});

// Export actions for use in React components
export const {
  addItem,
  editItem,
  deleteItem,
  toggleBought,
  clearBought,
} = shoppingSlice.actions;

// Export reducer for the Redux store
export default shoppingSlice.reducer;
