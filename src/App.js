import "./styles.css";
import { Routes, Route } from "react-router-dom";
import {
  Login,
  Signup,
  Navbar,
  Home,
  Explore,
  User,
  NewPost
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
        <Route path="/user" element={<User />} />
        <Route path="/newpost" element={<NewPost />} />
      </Routes>
    </div>
  );
}
