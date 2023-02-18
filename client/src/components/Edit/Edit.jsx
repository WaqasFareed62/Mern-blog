import { useEffect, useState } from "react";

import { Navigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import Editor from "../Editor";
function Edit() {
  const [title, setTitle] = useState("");
  const [summery, setSummery] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setSummery(postInfo.summery);
        setContent(postInfo.content);
      });
    });
  }, []);

  async function UpdatePost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summery", summery);
    data.set("content", content);
    data.set("file", file[0]);
    data.set("id", id);
    ev.preventDefault();

    const response = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }
  return (
    <form onSubmit={UpdatePost}>
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
        Update Post
      </button>
    </form>
  );
}

export default Edit;
