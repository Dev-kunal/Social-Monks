import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  updateStatus: "idle",
  followersStatus: "idle",
  followingStatus: "idle",
  loggedInUserId: "60db08481fa2cb0793c5f465",
  userInfo: {},
  followers: [],
  following: [],
  error: null,
};

// export const getAuthorizedUser = createAsyncThunk(
//   "/authuser/userInfo",
//   async () => {
//     console.log(loggedInUserId);
//     const response = await axios.get("http://localhost:7000/user", {
//       headers: { userId: loggedInUserId },
//     });
//     console.log("auth user", response.data.userInfo[0]);
//     return response.data.userInfo[0];
//   }
// );

export const getUser = createAsyncThunk("/user/userInfo", async (userId) => {
  const response = await axios.get("http://localhost:7000/user", {
    headers: { userId: userId },
  });
  console.log(" user", response.data.userInfo[0]);
  return response.data.userInfo[0];
});

export const updateUserProfile = createAsyncThunk(
  "user/updateUserInfo",
  async (userUpdate) => {
    const response = await axios.post(
      "http://localhost:7000/user/update",
      userUpdate,
      {
        headers: { userId: "60db08481fa2cb0793c5f465" },
      }
    );
    console.log(response.data);
    return response.data;
  }
);

export const getFollowers = createAsyncThunk(
  "/user/followers",
  async (userId) => {
    const response = await axios.post("http://localhost:7000/user/followers", {
      userId: userId,
    });
    console.log(response.data.followers);
    return response.data;
  }
);

export const getFollowing = createAsyncThunk(
  "/user/following",
  async (userId) => {
    const response = await axios.post("http://localhost:7000/user/following", {
      userId: userId,
    });
    console.log("following result", response.data.following);
    return response.data;
  }
);

export const followUnfollow = createAsyncThunk(
  "user/followunfollow",
  async (userToFollowUnfollow) => {
    const response = await axios.post("http://localhost:7000/followunfollow", {
      userId: "60db08481fa2cb0793c5f465",
      followingId: userToFollowUnfollow,
    });
    console.log(response.data);
    return response.data;
  }
);

const profileSlice = createSlice({
  name: "userInfo",
  reducers: {
    resetProfile(state) {
      state.status = "idle";
    },
    resetFollowers(state) {
      state.followers = [];
      state.followersStatus = "idle";
    },
    resetFollowing(state) {
      state.following = [];
      state.followingStatus = "idle";
    },
  },
  initialState,
  extraReducers: {
    // [getAuthorizedUser.pending]: (state, action) => {
    //   state.status = "loading";
    // },
    // [getAuthorizedUser.fulfilled]: (state, action) => {
    //   state.status = "fulfilled";
    //   state.userInfo = action.payload;
    // },
    [getUser.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.userInfo = action.payload;
    },
    [updateUserProfile.fulfilled]: (state, action) => {
      state.userInfo = action.payload.updatedUser;
      state.updateStatus = "fulfilled";
      state.status = "idle";
    },
    [updateUserProfile.rejected]: (state, action) => {
      state.updateStatus = "rejected";
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

export const { resetProfile, resetFollowers, resetFollowing } =
  profileSlice.actions;
export default profileSlice.reducer;
