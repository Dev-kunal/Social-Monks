import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../utils";

const initialState = {
  status: "idle",
  updateStatus: "idle",
  followersStatus: "idle",
  followingStatus: "idle",
  userInfo: {},
  followers: [],
  following: [],
  error: null,
};

export const getUser = createAsyncThunk("/user/userInfo", async (userId) => {
  try {
    const response = await instance.get(`/profile/${userId}`);
    console.log("user profile ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateUserProfile = createAsyncThunk(
  "/user/updateProfile",
  async (userUpdate) => {
    try {
      const response = await instance.post("/user/update", userUpdate);
      console.log("resposne from backend", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFollowers = createAsyncThunk(
  "/user/followers",
  async (userId) => {
    const response = await instance.post("/user/followers", {
      userId: userId,
    });
    console.log(response.data.followers);
    return response.data;
  }
);

export const getFollowing = createAsyncThunk(
  "/user/following",
  async (userId) => {
    const response = await instance.post("/user/following", {
      userId: userId,
    });
    console.log("following result", response.data.following);
    return response.data;
  }
);

export const followUnfollow = createAsyncThunk(
  "user/followunfollow",
  async (userToFollowUnfollow) => {
    try {
      const response = await instance.post("/followunfollow", {
        followingId: userToFollowUnfollow,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const profileSlice = createSlice({
  name: "userInfo",
  reducers: {
    resetProfile: (state) => {
      state.status = "idle";
      state.userInfo = {};
    },
    resetFollowers: (state) => {
      state.followers = [];
      state.followersStatus = "idle";
    },
    resetFollowing: (state) => {
      state.following = [];
      state.followingStatus = "idle";
    },
    reduceFollowingCount: (state) => {
      console.log("reduce following");
      state.userInfo.following = state.userInfo.following - 1;
    },
    followUser: (state, action) => {
      console.log("inside follow user");
      state.userInfo.followers.push(action.payload.followerId);
    },
    resetUserInfo: (state) => {
      state.userInfo = {};
      state.followers = [];
      state.following = [];
      state.status = "idle";
      state.followersStatus = "idle";
      state.followingStatus = "idle";
      state.updateStatus = "idle";
    },
  },
  initialState,
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.userInfo = action.payload.userData[0];
    },
    [getUser.rejected]: (state, action) => {
      state.status = "rejected";
      console.log(action.payload);
      state.userInfo = action.payload.userData[0];
    },

    [updateUserProfile.fulfilled]: (state, action) => {
      console.log("from fulfilled update", action.payload.updatedUser);
      state.userInfo = action.payload.updatedUser;
    },
    [getFollowers.fulfilled]: (state, action) => {
      state.followers = action.payload.followers;
      state.followersStatus = "fulfilled";
    },
    [getFollowing.fulfilled]: (state, action) => {
      state.following = action.payload.following;
      state.followingStatus = "fulfilled";
    },
    [followUnfollow.fulfilled]: (state, action) => {
      if (action.payload.unfollowed) {
        let updatedFollowers = state.userInfo.followers.map((follower) => ({
          ...follower,
          followStatus: "notfollowing",
        }));
        state.userInfo.followers = updatedFollowers;
      }
      if (action.payload.followed) {
        let updatedFollowers = state.userInfo.followers.map((follower) => ({
          ...follower,
          followStatus: "following",
        }));
        state.userInfo.followers = updatedFollowers;
      }
    },
  },
});

export const {
  resetProfile,
  resetFollowers,
  resetFollowing,
  reduceFollowingCount,
  followUser,
  resetUserInfo,
} = profileSlice.actions;
export default profileSlice.reducer;
