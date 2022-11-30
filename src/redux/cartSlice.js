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

    remove(state, action) {
      return state.filter((item) => item !== action.payload);
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
