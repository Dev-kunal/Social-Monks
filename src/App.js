import "./styles.css";
import { Routes, Route } from "react-router-dom";
import {
  Login,
  Signup,
  Navbar,
  Home,
  Explore,
  Profile,
  NewPost,
  Search,
  EditProfile,
  Followers,
  Following,
  Viewpost,
} from "./components/index";
import { useEffect } from "react";
import { Activity } from "./components/activity/Activity";
import {
  PrivateRoute,
  setupAuthHeaderForServiceCalls,
} from "./components/utils";
import { useSelector } from "react-redux";

export default function App() {
  const { token } = useSelector((state) => state.loggedInUserInfo);
  if (token) {
    setupAuthHeaderForServiceCalls(token);
  }
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/explore" element={<Explore />} />
        <PrivateRoute path="/activity" element={<Activity />} />
        <PrivateRoute path="/profile" element={<Profile />} />
        <PrivateRoute path="/newpost" element={<NewPost />} />
        <PrivateRoute path="/search" element={<Search />} />
        <PrivateRoute path="/editprofile" element={<EditProfile />} />
        <PrivateRoute path="/followers" element={<Followers />} />
        <PrivateRoute path="/following" element={<Following />} />
        <PrivateRoute path="/viewpost" element={<Viewpost />} />
      </Routes>
    </div>
  );
}
