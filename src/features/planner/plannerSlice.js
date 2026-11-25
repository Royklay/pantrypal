import { createSlice } from "@reduxjs/toolkit";

const plannerSlice = createSlice({
  name: "planner",

  initialState: {
    meals: [],
  },

  reducers: {
    // Add a meal to a particular day
    addMeal: (state, action) => {
      const meal = action.payload;

      // Prevent duplicate meals on the same day
      const exists = state.meals.some(
        (item) =>
          item.recipeId === meal.recipeId &&
          item.day === meal.day
      );

      if (!exists) {
        state.meals.push(meal);
      }
    },

    // Remove a planned meal
    removeMeal: (state, action) => {
      state.meals = state.meals.filter(
        (meal) => meal.id !== action.payload
      );
    },

    // Change a meal's planned day
    updateMealDay: (state, action) => {
      const { id, day } = action.payload;

      const meal = state.meals.find(
        (item) => item.id === id
      );

      if (meal) {
        const duplicate = state.meals.some(
          (item) =>
            item.recipeId === meal.recipeId &&
            item.day === day &&
            item.id !== id
        );

        if (!duplicate) {
          meal.day = day;
        }
      }
    },
  },
});

export const {
  addMeal,
  removeMeal,
  updateMealDay,
} = plannerSlice.actions;

export default plannerSlice.reducer;