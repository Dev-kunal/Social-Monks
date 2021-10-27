import "./explore.css";
import { MobileNav } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "./exploreSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "react-loader-spinner";
export const Explore = () => {
  const dispatch = useDispatch();
  const { allPosts, status } = useSelector((state) => state.allPosts);
  const { token } = useSelector((state) => state.loggedInUserInfo);
  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllPosts(token));
    }
  }, [status, dispatch]);
  const navigate = useNavigate();
  return (
    <div className="explore-page">
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

      <div className="explore-container">
        {allPosts.map(({ _id, fileurl }) => (
          <div
            key={_id}
            className="explore-post"
            onClick={() =>
              navigate("/viewpost", {
                state: { postId: _id },
              })
            }
          >
            <img src={fileurl} width="100%" height="100%" alt="img-post" />
          </div>
        ))}
      </div>
    </div>
  );
};
