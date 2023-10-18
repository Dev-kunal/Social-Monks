import { MobileNav } from "../navbar/MobileNav";
import { Post } from "../post/Post";
import "./home.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadPosts, resetFeed } from "../post/postSlice";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";

export const Home = () => {
  const { posts, status, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(loadPosts());
    }
  }, [status, dispatch]);
  return (
    <div className="home">
      <MobileNav />
      {status === "loading" && (
        <div className="loader-container">
          <Loader
            type="Oval"
            color="#2bc48a"
            height={60}
            width={60}
            timeout={3000}
          />
        </div>
      )}

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
              Youve not followed anyone, follow some users to see their posts
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
