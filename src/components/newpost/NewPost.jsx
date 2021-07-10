import axios from "axios";
import { useEffect, useState } from "react";
import { MobileNav } from "../navbar/MobileNav";
import { ProgressBar } from "./ProgressBar";
import "./newpost.css";
import { instance } from "../utils";

export const NewPost = () => {
  const [file, setFile] = useState(null);
  const [fileStatus, setfileStatus] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploadedFileurl, setuploadedFileurl] = useState(null);

  const selectFile = (event) => {
    let selectedFile = event.target.files[0];
    const allowFileTypes = ["image/png", "image/jpeg"];

    if (selectedFile && allowFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setfileStatus("");
    } else {
      setFile(null);
      setfileStatus("Select an image file (png or jpg)");
    }
  };

  const uploadPost = () => {
    if (uploadedFileurl) {
      console.log("submit");
      const postData = {
        caption: caption,
        fileurl: uploadedFileurl,
      };
      (async () => {
        try {
          const response = await instance.post("/posts", postData);
          console.log(response.data);
          if (response.data.success) {
            setFile(null);
            setCaption("");
            setuploadedFileurl(null);
            setfileStatus("Uploaded");
          }
        } catch (error) {
          setFile(null);
          console.log(error);
        }
      })();
    } else {
      setfileStatus("Please select an image");
    }
  };

  return (
    <div className="newpost">
      <div className="newpost-container">
        <form method="POST" className="post-form">
          <input
            className="input line-input"
            type="text"
            id="line-input-md"
            placeholder="Caption..."
            name="caption"
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
          />
          <div className="seprator">&</div>
          <label className="upload-label">
            <input
              required
              type="file"
              onChange={(event) => selectFile(event)}
              id="file-to-upload"
              name="image"
            />
            <span>+</span>
          </label>
          <button
            onClick={uploadPost}
            type="button"
            className="plain-action-btn mt"
            disabled={uploadedFileurl ? false : true}
          >
            Upload
          </button>
        </form>
        {fileStatus && <div className="error">{fileStatus}</div>}
        {file && (
          <ProgressBar
            file={file}
            setFile={setFile}
            setuploadedFileurl={setuploadedFileurl}
          />
        )}
      </div>

      <MobileNav />
    </div>
  );
};
