import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../utils";

const initialState = {
  status: "idle",
  error: null,
  allPosts: [],
};

export const getAllPosts = createAsyncThunk("explore/allposts", async () => {
  try {
    const response = await instance.get("/user/explore");
    console.log(response.data.allPosts);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const exploreSlice = createSlice({
  name: "explore",
  reducers: {
    resetAllPosts: (state) => {
      state.allPosts = [];
      state.status = "idle";
    },
  },
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
export const { resetAllPosts } = exploreSlice.actions;
