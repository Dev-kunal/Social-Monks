import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../utils";

const initialState = {
  status: "idle",
  updateStatus: "idle",
  followUnfollowStatus: "idle",
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

    return response.data;
  }
);

export const getFollowing = createAsyncThunk(
  "/user/following",
  async (userId) => {
    const response = await instance.post("/user/following", {
      userId: userId,
    });

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
      (state.following = []), (state.followingStatus = "idle");
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
      state.userInfo = action.payload.userData[0];
    },
    [getUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateUserProfile.pending]: (state) => {
      state.updateStatus = "loading";
    },
    [updateUserProfile.fulfilled]: (state, action) => {
      state.userInfo = action.payload.updatedUser;
      state.updateStatus = "fulfilled";
    },

    [getFollowers.pending]: (state) => {
      state.followersStatus = "loading";
    },
    [getFollowers.fulfilled]: (state, action) => {
      state.followers = action.payload.followers;
      state.followersStatus = "fulfilled";
    },
    [getFollowing.pending]: (state) => {
      state.followingStatus = "loading";
    },
    [getFollowing.fulfilled]: (state, action) => {
      state.following = action.payload.following;
      state.followingStatus = "fulfilled";
    },
    [followUnfollow.pending]: (state) => {
      state.followUnfollowStatus = "loading";
    },
    [followUnfollow.fulfilled]: (state, action) => {
      const loginUserId = JSON.parse(localStorage.getItem("user")).userId;
      if (action.payload.unfollowed) {
        let updatedFollowers = state.userInfo.followers.map((follower) =>
          follower.userId === loginUserId
            ? {
                ...follower,
                followStatus: "notfollowing",
              }
            : follower
        );
        state.userInfo.followers = updatedFollowers;
        state.followUnfollowStatus = "fulfilled";
      }
      if (action.payload.followed) {
        let updatedFollowers = state.userInfo.followers.map((follower) =>
          follower.userId === loginUserId
            ? {
                ...follower,
                followStatus: "following",
              }
            : follower
        );
        state.userInfo.followers = updatedFollowers;
        state.followUnfollowStatus = "fulfilled";
      }
    },
  },
});

export const {
  resetProfile,
  resetFollowers,
  resetFollowing,
  reduceFollowerCount,
  followUser,
  resetUserInfo,
} = profileSlice.actions;
export default profileSlice.reducer;
