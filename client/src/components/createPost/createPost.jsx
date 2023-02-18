import { useState } from "react";

import { Navigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import Editor from "../Editor";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [summery, setSummery] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function createPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summery", summery);
    data.set("content", content);
    data.set("file", file[0]);
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form onSubmit={createPost}>
      <input
        type="text"
        value={title}
        onChange={(ev) => {
          setTitle(ev.target.value);
        }}
        placeholder="Enter Title"
      />
      <input
        type="summry"
        value={summery}
        onChange={(ev) => {
          setSummery(ev.target.value);
        }}
        placeholder="Enter Summry"
      />
      <input
        type="file"
        onChange={(ev) => {
          setFile(ev.target.files);
        }}
      />
      <Editor value={content} onChange={setContent} />
      <button className="btn" style={{ marginTop: 5 }}>
        Create Post
      </button>
    </form>
  );
}

export default CreatePost;
