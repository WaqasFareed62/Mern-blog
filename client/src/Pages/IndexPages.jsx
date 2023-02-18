import React, { useEffect, useState } from "react";
import Post from "../components/post/post";

function IndexPages() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        return setPost(posts);
      });
    });
  }, []);

  return (
    <>
      {post.length > 0 &&
        post.map((post) => {
          return <Post {...post} />;
        })}
    </>
  );
}

export default IndexPages;
