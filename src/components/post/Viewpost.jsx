import { useDispatch, useSelector } from "react-redux";
import { MobileNav } from "..";
import { useEffect } from "react";
import { getPost, resetPost } from "./postSlice";
import { Post } from "./Post";
import { useLocation } from "react-router-dom";

export const Viewpost = () => {
  const dispatch = useDispatch();
  const { postStatus, post, error } = useSelector((state) => state.posts);
  const {
    state: { postId },
  } = useLocation();
  console.log(postId);
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(getPost(postId));
    }
    return () => {
      // dispatch(resetPost());
    };
  }, [postStatus, dispatch]);

  return (
    <div>
      <div className="home">
        <MobileNav />
        {post && post._id && <Post {...post} />}
      </div>
    </div>
  );
};
