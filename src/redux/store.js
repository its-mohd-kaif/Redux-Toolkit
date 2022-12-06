import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import deleteSlice from "./deleteSlice";
import updateSlice from "./updateSlice";
import addSlice from "./addSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    add: addSlice,
    product: productSlice,
    delete: deleteSlice,
    update: updateSlice,
  },
});

export default store;
