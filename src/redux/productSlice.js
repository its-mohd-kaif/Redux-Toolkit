// import { createSlice } from "@reduxjs/toolkit";

// const STATUSES = Object.freeze({
//   IDLE: "idle",
//   ERROR: "error",
//   LOADING: "loading",
// });

// const productSlice = createSlice({
//   name: "product",
//   initialState: {
//     data: [],
//     status: STATUSES.IDLE,
//   },

//   reducers: {
//     setProducts(state, action) {
//       state.data = action.payload;
//     },
//     setStatus(state, action) {
//       state.status = action.payload;
//     },
//   },
// });

// export const { setProducts, setStatus } = productSlice.actions;
// export default productSlice.reducer;

// export function fetchProducts() {
//   return async function fetchProductThunk(dispatch, getState) {
//     dispatch(setStatus(STATUSES.LOADING));
//     try {
//       const res = await fetch("https://dummyjson.com/carts/user/1");
//       const data = await res.json();
//       dispatch(setProducts(data));
//       dispatch(setStatus(STATUSES.IDLE));
//     } catch (err) {
//       console.log(err);
//       dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// }

import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const fetchProducts = createAsyncThunk("user/fetchUsers", async () => {
  const response = await axios.get("https://dummyjson.com/carts/user/1");
  return response.data;
});

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
