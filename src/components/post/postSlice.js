import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../utils";

const initialState = {
  status: "idle",
  error: null,
  posts: [],
  postStatus: "idle",
  post: {},
};

export const loadPosts = createAsyncThunk("/posts/loadposts", async () => {
  try {
    const response = await instance.get("/user/feed");
    console.log("inside feed");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }

  return response.data;
});

export const getPost = createAsyncThunk("posts/viewpost", async (postId) => {
  try {
    console.log("inside get");
    const response = await instance.get(`/posts/${postId}`);
    console.log(response.data.post);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const likePost = createAsyncThunk("/posts/like", async (postId) => {
  try {
    const response = await instance.post("/posts/like", {
      postId: postId,
    });
    console.log("likedPost", response.data.likedPost);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const unlikePost = createAsyncThunk("/posts/unlike", async (postId) => {
  const response = await instance.post("/posts/unlike", {
    postId: postId,
  });
  console.log("unliked post", response.data.unLikedPost);
  return response.data;
});

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetFeed: (state) => {
      console.log("inside resetFeed");
      state.status = "idle";
      state.posts = null;
    },
    resetPost: (state) => {
      state.post = null;
      state.postStatus = "idle";
    },
  },
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
    [getPost.fulfilled]: (state, action) => {
      state.post = action.payload.post;
      state.postStatus = "fulfilled";
    },
    [likePost.fulfilled]: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload.likedPost._id
      );
      state.posts[postIndex] = action.payload.likedPost;
      // state.posts = state.posts.map((post) =>
      //   post._id === action.payload.likedPost._id
      //     ? { ...action.payload.likedPost }
      //     : post
      // );
      state.post = action.payload.likedPost;
      state.status = "fulfilled";
    },

    [unlikePost.fulfilled]: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload.unLikedPost._id
      );
      state.posts[postIndex] = action.payload.unLikedPost;
      // state.posts = state.posts.map((post) =>
      //   post._id === action.payload.unLikedPost._id
      //     ? { ...action.payload.unLikedPost }
      //     : post
      // );
      state.post = action.payload.unLikedPost;
      state.status = "fulfilled";
    },
  },
});

export default postSlice.reducer;
export const { resetFeed, resetPost } = postSlice.actions;
