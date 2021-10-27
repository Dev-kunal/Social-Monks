import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { instance } from "../../utils";

const initialState = {
  status: "idle",
  error: null,
  searchedUsers: [],
};

export const getSearchedUsers = createAsyncThunk(
  "seatch/users",
  async (value) => {
    const response = await instance.post("/user/search", {
      searchTerm: value,
    });

    return response.data;
  }
);

export const searchSlice = createSlice({
  name: "search",
  reducers: {},
  initialState,
  extraReducers: {
    [getSearchedUsers.pending]: (state) => {
      state.status = "loading";
    },
    [getSearchedUsers.fulfilled]: (state, action) => {
      state.searchedUsers = action.payload.users;
      state.status = "fulfilled";
    },
  },
});

export default searchSlice.reducer;
