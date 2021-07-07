import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  error: null,
  allPosts: [],
};

export const getAllPosts = createAsyncThunk("explore/allposts", async () => {
  const response = await axios.get("http://localhost:7000/posts");
  console.log(response.data.allPosts);
  return response.data;
});

export const exploreSlice = createSlice({
  name: "explore",
  reducers: {},
  initialState,
  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.status = "loading";
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.allPosts = action.payload.allPosts;
    },
  },
});

export default exploreSlice.reducer;
