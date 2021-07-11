import { MobileNav } from "../navbar/MobileNav";
import { Post } from "../post/Post";
import "./home.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadPosts, resetFeed } from "../post/postSlice";
import { useSelector } from "react-redux";

export const Home = () => {
  const { posts, status, error } = useSelector((state) => state.posts);
  const { token } = useSelector((state) => state.loggedInUserInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(loadPosts());
    }
  }, [status, dispatch, posts]);

  console.log("posts from homepage", posts);
  console.log("token from homepage", token);
  return (
    <div className="home">
      <MobileNav />
      {status !== "idle" && (
        <div>
          {posts?.length < 1 && (
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

          {posts?.map(({ ...props }) => (
            <Post {...props} />
          ))}
        </div>
      )}
    </div>
  );
};
