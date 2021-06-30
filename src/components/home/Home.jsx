import { MobileNav } from "../navbar/MobileNav";
import { Post } from "../post/Post";
import "./home.css";
export const Home = () => {
  return (
    <div className="home">
      <MobileNav />
      <Post />
    </div>
  );
};
