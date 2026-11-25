import { configureStore } from "@reduxjs/toolkit";

// Temporary shared Redux store.
// We will connect the four feature reducers during integration.

const store = configureStore({
  reducer: (state = {}) => state,
});

export default store;