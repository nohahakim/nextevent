import { useState, useEffect } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  useEffect(() => {
    // ➕ Fetch comments when component mounts
    async function fetchComments() {
      const response = await fetch(`/api/comments/${eventId}`); // 📡 GET request to API route
      const data = await response.json(); // 📥 Parse response
      setComments(data.comments || []); // 🗃️ Set comments state
    }

    if (showComments) {
      fetchComments(); // 🏃‍♂️ Fetch comments if showing
    }
  }, [showComments, eventId]); // 🧩 Dependency arra  y

  async function addCommentHandler(commentData) {
    // ➕ Async handler for new comment
    const response = await fetch(`/api/comments/${eventId}`, {
      // 📡 POST to API route
      method: "POST", // 📬 POST method
      body: JSON.stringify(commentData), // 📦 JSON payload
      headers: {
        // 📋 Headers
        "Content-Type": "application/json", // 📝 Specify JSON
      },
    });
    const data = await response.json(); // 📥 Parse response
    console.log(data); // 🖨️ Log response data
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
