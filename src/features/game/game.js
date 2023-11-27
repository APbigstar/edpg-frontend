import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "game",
  initialState: {
    value: "start",
  },
  reducers: {
    setGameType: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setGameType } = counterSlice.actions;
export default counterSlice.reducer;
