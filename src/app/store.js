import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../components/auth/userSlice";
import exploreSliceReducer from "../components/explore/exploreSlice";
import postSliceReducer from "../components/post/postSlice";
import profileSliceReducer from "../components/profile/profileSlice";
import searchSliceReducer from "../components/search/searchSlice";
export const store = configureStore({
  reducer: {
    posts: postSliceReducer,
    allPosts: exploreSliceReducer,
    userInfo: profileSliceReducer,
    searchedUsers: searchSliceReducer,
    loggedInUserInfo: userSliceReducer,
  },
});
