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
} from "./components/index";
import { useEffect } from "react";
import { Activity } from "./components/activity/Activity";
import {
  PrivateRoute,
  setupAuthHeaderForServiceCalls,
} from "./components/utils";

export default function App() {
  // useEffect(() => {
  //   (async () => {
  //     const userDataFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  //     if (userDataFromLocalStorage) {
  //       setupAuthHeaderForServiceCalls(userDataFromLocalStorage.token);
  //     }
  //   })();
  // }, []);

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
      </Routes>
    </div>
  );
}
