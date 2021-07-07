import { MobileNav } from "../navbar/MobileNav";
import { Post } from "../post/Post";
import "./home.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadPosts } from "../post/postSlice";
import { useSelector } from "react-redux";

export const Home = () => {
  const { posts, status, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(loadPosts());
    }
  }, [status, dispatch]);

  console.log("posts from homepage", posts);
  return (
    <div className="home">
      <MobileNav />
      {posts.length < 1 && (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Youve not followed anyone follow some users to see their posts
        </div>
      )}
      {posts.map(({ ...props }) => (
        <Post {...props} />
      ))}
    </div>
  );
};
