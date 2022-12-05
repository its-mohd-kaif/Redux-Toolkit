import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    list: [],
  },

  reducers: {
    add: (state, action) => {
      state.list.push(action.payload);
    },

    update(state, action) {
      return state;
    },

    deleteCart: (state, action) => {
      return state;
    },
  },
});

export const { add, update, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;
