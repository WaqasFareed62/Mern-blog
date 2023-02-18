import React from "react";
import { formatISO9075 } from "date-fns";
import "./post.css";
import { Link } from "react-router-dom";

function post(prop) {
  return (
    <div className="post">
      <div className="image">
        <Link className="link" to={`/post/${prop._id}`}>
          <img src={"http://localhost:4000/" + prop.cover} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link className="links" to={`/post/${prop._id}`}>
          <h2 className="title">{prop.title}</h2>
        </Link>
        <p className="date">
          <span>
            <a className="author" href="click">
              {prop.author.username}
            </a>
            <time>{formatISO9075(new Date(prop.createdAt))}</time>
          </span>
        </p>
        <p>{prop.summery}</p>
      </div>
    </div>
  );
}

export default post;
