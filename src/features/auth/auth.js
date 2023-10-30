import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "auth",
  initialState: {
    value: false,
  },
  reducers: {
    setIsLoggedin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsLoggedin } = counterSlice.actions;
export default counterSlice.reducer;
