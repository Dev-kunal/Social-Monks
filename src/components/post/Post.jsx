import "./post.css";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost } from "./postSlice";
import { useNavigate } from "react-router-dom";

export const Post = ({
  _id,
  userId: { _id: userId, username, profileUrl },
  fileurl,
  caption,
  likes,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.loggedInUserInfo);
  const isPostLiked = () => {
    return likes.includes(loggedInUser._id);
  };

  return (
    <>
      <div className="post" key={_id}>
        <div className="user">
          <img
            className="avatar-small"
            src={profileUrl}
            alt="Avatar"
            onClick={() =>
              navigate("/profile", {
                state: {
                  userId: userId,
                },
              })
            }
          />
          <div>
            <strong>{username}</strong>
            <br />
            <small>on Earth</small>
          </div>
        </div>
        <div className="post-img">
          <img src={fileurl} width="100%" height="auto" alt="img-logo" />
        </div>
        <div className="post-actions">
          <div className="group1">
            {isPostLiked() ? (
              <button
                onClick={() => dispatch(unlikePost(_id))}
                className="post-action-btn"
              >
                <i className="fas fa-heart "></i>
              </button>
            ) : (
              <button
                onClick={() => dispatch(likePost(_id))}
                className="post-action-btn"
              >
                <i className="far fa-heart "></i>
              </button>
            )}
            <span>
              {likes.length} {likes.length > 1 ? "Likes" : "Like"}
            </span>
          </div>
          <div className="group2">
            {/* <button className="post-action-btn">
              <i className="far fa-bookmark"></i>
            </button> */}
          </div>
        </div>
        <div className="post-caption">
          {" "}
          <span>
            {caption}
            <br />
          </span>
        </div>
      </div>
    </>
  );
};
