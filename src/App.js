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
import { Activity } from "./components/activity/Activity";
export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/search" element={<Search />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/followers" element={<Followers />} />
        <Route path="/following" element={<Following />} />
      </Routes>
    </div>
  );
}
