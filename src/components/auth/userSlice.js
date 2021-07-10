import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../utils";

const userDataFromLocalStorage = JSON.parse(localStorage.getItem("user")) || {};

const initialState = {
  status: "idle",
  error: null,
  loggedInUser: userDataFromLocalStorage
    ? {
        _id: userDataFromLocalStorage.userId,
        profileUrl: userDataFromLocalStorage.profileUrl,
      }
    : {},
  token: userDataFromLocalStorage.token || null,
  notifications: [],
};

export const loginUser = createAsyncThunk("auth/login", async (userData) => {
  const response = await axios.post(
    "http://localhost:7000/auth/login",
    userData
  );
  console.log("after login userdata", response.data);
  return response.data;
});
export const signupUser = createAsyncThunk("auth/signup", async (userData) => {
  const response = await axios.post(
    "http://localhost:7000/auth/signup",
    userData
  );
  console.log(response.data);
  return response.data;
});

export const getNotifications = createAsyncThunk(
  "user/notifications",
  async () => {
    try {
      const response = await instance.get("/notifications");
      console.log("notifications", response.data.notifications);
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
    resetloggedInUserInfo: (state) => {
      state.loggedInUser = {};
      state.token = null;
      state.notifications = [];
      localStorage.removeItem("user");
      state.status = "idle";
    },
    resetProfileImg: (state, action) => {
      console.log("from reset pimg", action.payload);
      state.loggedInUser.profileUrl = action.payload;
    },
    resetNotifications: (state) => {
      state.notifications = [];
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
    [signupUser.fulfilled]: (state, action) => {
      state.status = "fulfilled";
    },
    [getNotifications.fulfilled]: (state, action) => {
      state.notifications = action.payload.notifications;
      state.status = "fulfilled";
    },
  },
});

export default userSlice.reducer;
export const { resetloggedInUserInfo, resetProfileImg, resetNotifications } =
  userSlice.actions;
