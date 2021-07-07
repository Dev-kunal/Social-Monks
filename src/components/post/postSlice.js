import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  error: null,
  posts: [],
};

export const loadPosts = createAsyncThunk("/posts/loadposts", async () => {
  const response = await axios.get("http://localhost:7000/user/feed", {
    headers: { userId: "60db08481fa2cb0793c5f465" },
  });
  console.log(response.data);
  return response.data;
});

export const likePost = createAsyncThunk("/posts/like", async (postId) => {
  const response = await axios.post("http://localhost:7000/posts/like", {
    userId: "60db08481fa2cb0793c5f465",
    postId: postId,
  });
  console.log(response.data.likedPost);
  return response.data;
});
export const unlikePost = createAsyncThunk("/posts/unlike", async (postId) => {
  const response = await axios.post("http://localhost:7000/posts/unlike", {
    userId: "60db08481fa2cb0793c5f465",
    postId: postId,
  });
  console.log(response.data.unLikedPost);
  return response.data;
});

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [loadPosts.pending]: (state) => {
      state.status = "loading";
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.postOfUsersIFollow;
      state.status = "fulfilled";
    },
    [loadPosts.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },

    [likePost.fulfilled]: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload.likedPost._id
      );
      state.posts[postIndex] = action.payload.likedPost;
      state.status = "fulfilled";
    },

    [unlikePost.fulfilled]: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload.unLikedPost._id
      );
      state.posts[postIndex] = action.payload.unLikedPost;
      state.status = "fulfilled";
    },
  },
});

export default postSlice.reducer;
