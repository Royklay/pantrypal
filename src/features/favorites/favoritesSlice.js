import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      const recipe = action.payload;
      const exists = state.items.some(
        (item) => item.idMeal === recipe.idMeal
      );
      if (!exists) {
        state.items.push(recipe);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(
        (item) => item.idMeal !== action.payload
      );
    },
  },
});