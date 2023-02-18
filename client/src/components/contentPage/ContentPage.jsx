import { formatISO9075 } from "date-fns";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


function ContentPage() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((response) => {
      response.json().then((info) => {
        setContent(info);
      });
    });
  }, []);
  if (!content) return "";
  return (
    <div>
      <h1 className="head">{content.title}</h1>
      <div className="time">
        <time>{formatISO9075(new Date(content.createdAt))}</time>
      </div>
      <div className="author">by{content.author.username}</div>
      <div className="btn-div">
        <Link to={`/edit/${content._id}`} className="btn-edit">
          Edit This
        </Link>
      </div>
      <img
        className="image"
        src={"http://localhost:4000/" + content.cover}
        alt=""
      ></img>
      <div
        className="p"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
    </div>
  );
}

export default ContentPage;
