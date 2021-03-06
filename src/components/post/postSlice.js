import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../utils";

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
    return response.data;
  } catch (error) {
    console.log(error);
  }

  return response.data;
});

export const getPost = createAsyncThunk("posts/viewpost", async (postId) => {
  try {
    const response = await instance.get(`/posts/${postId}`);
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
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const unlikePost = createAsyncThunk("/posts/unlike", async (postId) => {
  const response = await instance.post("/posts/unlike", {
    postId: postId,
  });
  return response.data;
});

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetFeed: (state) => {
      state.status = "idle";
      state.posts = [];
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
    [getPost.pending]: (state, action) => {
      state.postStatus = "loading";
    },
    [likePost.fulfilled]: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload.likedPost._id
      );
      state.posts[postIndex] = action.payload.likedPost;
      state.post = action.payload.likedPost;
      state.status = "fulfilled";
    },

    [unlikePost.fulfilled]: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload.unLikedPost._id
      );
      state.posts[postIndex] = action.payload.unLikedPost;
      state.post = action.payload.unLikedPost;
      state.status = "fulfilled";
    },
  },
});

export default postSlice.reducer;
export const { resetFeed } = postSlice.actions;
