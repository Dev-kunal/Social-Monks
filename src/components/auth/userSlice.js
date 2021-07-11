import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../utils";

const userDataFromLocalStorage =
  JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  status: "idle",
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
console.log(initialState.token);

export const loginUser = createAsyncThunk("auth/login", async (userData) => {
  const response = await instance.post("/auth/login", userData);
  return response.data;
});
export const signupUser = createAsyncThunk("auth/signup", async (userData) => {
  const response = await axios.post("/auth/signup", userData);
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
      localStorage.removeItem("user");
      state.loggedInUser = null;
      state.token = null;
      state.notifications = null;
      state.status = "idle";
      state.notificationStatus = "idle";
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
    [loginUser.rejected]: (state, action) => {
      state.status = "rejected";
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
