import { useDispatch, useSelector } from "react-redux";
import { MobileNav } from "..";
import { useEffect } from "react";
import { getPost, resetPost } from "./postSlice";
import { Post } from "./Post";
import { useLocation } from "react-router-dom";
import Loader from "react-loader-spinner";

export const Viewpost = () => {
  const dispatch = useDispatch();
  const { postStatus, post, error } = useSelector((state) => state.posts);
  const {
    state: { postId },
  } = useLocation();
  useEffect(() => {
    dispatch(getPost(postId));
  }, []);

  return (
    <div>
      <div className="home">
        {postStatus === "loading" && (
          <div className="loader-container">
            <Loader
              type="Oval"
              color="#2bc48a"
              height={60}
              width={60}
              timeout={1000}
            />
          </div>
        )}
        <MobileNav />
        {post && post?._id && <Post {...post} />}
      </div>
    </div>
  );
};
