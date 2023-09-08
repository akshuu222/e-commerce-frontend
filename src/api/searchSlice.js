import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  category:""
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setSearch , setCategory } = searchSlice.actions;

export default searchSlice.reducer;
