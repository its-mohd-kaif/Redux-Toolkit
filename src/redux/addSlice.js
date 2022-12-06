import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const addProducts = createAsyncThunk("addCart", async (id,quantity) => {
  const response = await fetch("https://dummyjson.com/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: id,
          quantity: quantity,
        },
      ],
    }),
  });
  const data = response.json();

  return data;
});

const addSlice = createSlice({
  name: "add",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.concat(action.payload);
      state.error = "";
    });
    builder.addCase(addProducts.rejected, (state, action) => {
      state.loading = false;
      state.values = [];
      state.error = action.error.message;
    });
  },
});

export default addSlice.reducer;
