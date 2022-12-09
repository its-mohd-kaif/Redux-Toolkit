import { configureStore } from "@reduxjs/toolkit";
import reduxSlice from "./reduxSlice";

const store = configureStore({
  reducer: {
    product: reduxSlice,
  },
});

export default store;
