import { configureStore } from "@reduxjs/toolkit";

// Import reducers from the four features
import favoritesReducer from "../features/favorites/favoritesSlice";
import plannerReducer from "../features/planner/plannerSlice";
import shoppingReducer from "../features/shopping/shoppingSlice";
import customRecipesReducer from "../features/customRecipes/customRecipesSlice";

// Create the central Redux store
const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    planner: plannerReducer,
    shopping: shoppingReducer,
    customRecipes: customRecipesReducer,
  },
});

export default store;