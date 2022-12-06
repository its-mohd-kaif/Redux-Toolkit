import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  values: false,
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const deleteProducts = createAsyncThunk("deleteCart", async () => {
  const response = axios.get("https://dummyjson.com/carts/1", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
    }),
  });
  return response.data;
});

const deleteSlice = createSlice({
  name: "delete",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.values = true;
      state.error = "";
    });
    builder.addCase(deleteProducts.rejected, (state, action) => {
      state.loading = false;
      state.values = false;
      state.error = action.error.message;
    });
  },
});

export default deleteSlice.reducer;
