import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  // Product
  items: [],
  // ADD
  users: [],
  // Update
  values: [],
  // Delete
  remove: [],
  // Error
  error: "",
};

// Generates pending, fulfilled and rejected action types
// For Initial Fetch Product
export const fetchProducts = createAsyncThunk("user/fetchUsers", async () => {
  const response = await axios.get("https://dummyjson.com/carts/user/1");
  return response.data;
});

// Generates pending, fulfilled and rejected action types
// For Add Product
export const addProducts = createAsyncThunk(
  "addCart",
  async ({ id, quantity }) => {
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
    const data = await response.json();

    return data;
  }
);

// Generates pending, fulfilled and rejected action types
// For Update Product
export const updateProducts = createAsyncThunk("updateCart", async () => {
  const response = await fetch("https://dummyjson.com/carts/1", {
    method: "PUT" /* or PATCH */,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merge: true, // this will include existing products in the cart
      products: [
        {
          id: 1,
          quantity: 1,
        },
      ],
    }),
  });
  const data = await response.json();
  return data;
});

// Generates pending, fulfilled and rejected action types
// For Delete Cart
export const deleteProducts = createAsyncThunk("deleteCart", async () => {
  const response = await fetch("https://dummyjson.com/carts/1", {
    method: "DELETE",
  });
  const data = response.json().catch((err) => console.log("DELETE ERROE", err));
  return data;
});
// Reducer
const reduxSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // Fetch Product
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.items = [];
      state.error = action.error.message;
    });
    // Add Slice
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
      state.users = [];
      state.error = action.error.message;
      console.log("ERROR", state.error.length);
    });
    // Update Slice
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
    // Delete Slice
    builder.addCase(deleteProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.remove = action.payload;
      state.error = "";
    });
    builder.addCase(deleteProducts.rejected, (state, action) => {
      state.loading = false;
      state.remove = [];
      state.error = action.error.message;
    });
  },
});

export default reduxSlice.reducer;
