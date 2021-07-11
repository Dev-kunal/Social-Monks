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
        <div className="explore-post">
          <img
            src="https://www.trawell.in/admin/images/upload/86351572Nane_Ghat.jpg"
            width="100%"
            height="100%"
            alt="img-post"
          />
        </div>
        <div className="explore-post">
          <img
            src="http://adventures365.in/blog/wp-content/uploads/2015/07/monsoon-treks-near-mumbai-pune.jpg"
            width="100%"
            height="100%"
            alt="img-logo"
          />
        </div>

        <div className="explore-post">
          <img
            src="https://images.thrillophilia.com/image/upload/s--0Yi6NMSn--/v1/images/photos/000/031/812/original/Kalsubai_7.jpg.jpg?1453311858"
            width="100%"
            height="100%"
            alt="img-logo"
          />
        </div>
        <div className="explore-post">
          <img
            src="https://bookmytrek.org/wp-content/uploads/2020/06/one_day_trek.jpeg"
            width="100%"
            height="100%"
            alt="img-logo"
          />
        </div>
        <div className="explore-post">
          <img
            src="https://live.staticflickr.com/506/20176958256_8f6c61fb62_b.jpg"
            width="100%"
            height="100%"
            alt="img-logo"
          />
        </div>
        <div className="explore-post">
          <img
            src="https://www.ravinetrek.com/img/monsoon-trek-maharashtra/kalsubai-peak.jpg"
            width="100%"
            height="100%"
            alt="img-logo"
          />
        </div>
        <div className="explore-post">
          <img
            src="https://www.alpineclimbers.in/img/gallery/kalsubai/11-1.jpg"
            width="100%"
            height="100%"
            alt="img-logo"
          />
        </div>
        <div className="explore-post">
          <img
            src="https://www.treksandtrails.org/blog/wp-content/uploads/2018/10/Naneghat-Trek-Blog.jpg"
            width="100%"
            height="100%"
            alt="img-logo"
          />
        </div>
      </div>
    </div>
  );
};
