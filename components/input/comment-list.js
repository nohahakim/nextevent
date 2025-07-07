import React from "react";
import classes from "./comment-list.module.css";

export default function CommentList(props) {
  return (
    <ul className={classes.comments}>
      {props.items.map((comment) => (
        <li key={comment._id.toString()}>
          <p>{comment.text}</p>
          <div>{comment.name}</div>
        </li>
      ))}
    </ul>
  );
}
