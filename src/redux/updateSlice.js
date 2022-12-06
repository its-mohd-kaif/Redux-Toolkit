import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  values: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const updateProducts = createAsyncThunk("updateCart", async () => {
  const response = await fetch("https://dummyjson.com/carts/1");
  const data = await response.json();
  return data;
});

const updateSlice = createSlice({
  name: "update",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.values = action.payload;
      state.error = "";
    });
    builder.addCase(updateProducts.rejected, (state, action) => {
      state.loading = false;
      state.values = [];
      state.error = action.error.message;
    });
  },
});

export default updateSlice.reducer;
