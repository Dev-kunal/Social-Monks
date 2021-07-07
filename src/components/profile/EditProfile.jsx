import "./edit.css";
import { useEffect, useState } from "react";
import { ProgressBar } from "../newpost/ProgressBar";
import { updateUserProfile } from "./profileSlice";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [uploadedFileurl, setuploadedFileurl] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    bio: "",
    fullname: "",
    profileUrl: "",
  });
  const { status, userInfo, error } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "fulfilled") {
      console.log(userInfo);
      setUserData(() => ({
        username: userInfo.username,
        bio: userInfo.bio,
        fullname: userInfo.fullname,
      }));
    }
  }, [status]);

  const updateProfile = () => {
    const userUpdate = { ...userData, profileUrl: uploadedFileurl };
    console.log(uploadedFileurl);
    console.log(userUpdate);
    dispatch(updateUserProfile(userUpdate));
    navigate("/profile");
  };

  const selectFile = (event) => {
    let selectedFile = event.target.files[0];
    const allowFileTypes = ["image/png", "image/jpeg"];
    if (selectedFile && allowFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setFileError("");
    } else {
      setFile(null);
      setFileError("Select an image file (png or jpg)");
    }
  };
  const onType = (event) => {
    let { name, value } = event.target;
    setUserData((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  return (
    <div className="edit-page">
      {" "}
      <div className="form">
        <h1 className="brand-name">Social monks</h1>
        <form>
          <div className="input-div">
            <label>
              <strong>Username</strong>
            </label>
            <input
              class="input-line"
              type="text"
              name="username"
              onChange={(event) => onType(event)}
              value={userData.username}
            />
            <label>
              <strong>full Name</strong>
            </label>
            <input
              class="input-line"
              type="text"
              name="fullname"
              id="input-md"
              onChange={(event) => onType(event)}
              value={userData.fullname}
            />
            <label>
              <strong>Bio</strong>
            </label>
            <input
              class="input-line"
              type="text"
              name="bio"
              id="input-md"
              onChange={(event) => onType(event)}
              value={userData.bio}
            />
            <label className="upload-label">
              <input
                required
                type="file"
                onChange={(event) => selectFile(event)}
                name="profileUrl"
              />
              <span>+</span>
            </label>

            <div>
              {" "}
              {fileError && <div className="error">{fileError}</div>}
              {file && (
                <ProgressBar
                  file={file}
                  setFile={setFile}
                  setuploadedFileurl={setuploadedFileurl}
                />
              )}
            </div>
          </div>
          <button className="btn" type="button" onClick={updateProfile}>
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};
