import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../utils";

const userDataFromLocalStorage =
  JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  status: "idle",
  signupStatus: "idle",
  error: null,
  loggedInUser: userDataFromLocalStorage
    ? {
        _id: userDataFromLocalStorage.userId,
        profileUrl: userDataFromLocalStorage.profileUrl,
      }
    : null,
  token: userDataFromLocalStorage?.token || null,
  notificationStatus: "idle",
  notifications: [],
};

export const loginUser = createAsyncThunk("auth/login", async (userData) => {
  const response = await instance.post("/auth/login", userData);
  return response.data;
});
export const signupUser = createAsyncThunk("auth/signup", async (userData) => {
  const response = await instance.post("/auth/signup", userData);

  return response.data;
});

export const getNotifications = createAsyncThunk(
  "user/notifications",
  async () => {
    try {
      const response = await instance.get("/notifications");

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    logOutUser: (state) => {
      localStorage.removeItem("user");
      state.loggedInUser = null;
      state.token = null;
      state.notifications = null;
      state.status = "idle";
      state.notificationStatus = "idle";
    },
    resetProfileImg: (state, action) => {
      state.loggedInUser.profileUrl = action.payload;
    },
    resetNotifications: (state) => {
      state.notifications = [];
      state.notificationStatus = "idle";
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.loggedInUser = action.payload.user;
      state.token = action.payload.token;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [signupUser.pending]: (state) => {
      state.signupStatus = "loading";
    },
    [signupUser.fulfilled]: (state) => {
      state.signupStatus = "fulfilled";
    },
    [getNotifications.pending]: (state) => {
      state.notificationStatus = "loading";
    },
    [getNotifications.fulfilled]: (state, action) => {
      state.notifications = action.payload.notifications;
      state.notificationStatus = "fulfilled";
    },
  },
});

export default userSlice.reducer;
export const { logOutUser, resetProfileImg, resetNotifications } =
  userSlice.actions;
