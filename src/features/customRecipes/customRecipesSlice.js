import { createSlice } from "@reduxjs/toolkit";

const customRecipesSlice = createSlice({
  name: "customRecipes",
  initialState: {
    items: [],
  },
  reducers: {
    addCustomRecipe: (state, action) => {
      state.items.push(action.payload);
    },
    editCustomRecipe: (state, action) => {
      const updatedRecipe = action.payload;
      const index = state.items.findIndex(
        (recipe) => recipe.id === updatedRecipe.id
      );
      if (index !== -1) {
        state.items[index] = updatedRecipe;
      }
    },
    deleteCustomRecipe: (state, action) => {
      state.items = state.items.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
  },
});

export const {
  addCustomRecipe,
  editCustomRecipe,
  deleteCustomRecipe,
} = customRecipesSlice.actions;

export default customRecipesSlice.reducer;