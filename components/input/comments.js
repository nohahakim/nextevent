import { useState, useEffect, useContext } from "react";
import NotificationContext from "@/store/notification-context";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    async function fetchComments() {
      const response = await fetch(`/api/comments/${eventId}`);
      const data = await response.json();
      setComments(data.comments || []);
    }

    if (showComments) {
      fetchComments();
    }
  }, [showComments, eventId]);

  async function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Adding comment...",
      message: "Your comment is being added.",
      status: "pending",
    });
    const response = await fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const data = await response.json();
      notificationCtx.showNotification({
        title: "Error adding comment",
        message: data.message || "Something went wrong.",
        status: "error",
      });
      return;
    }
    const data = await response.json();

    notificationCtx.showNotification({
      title: "Success",
      message: "Comment added successfully!",
      status: "success",
    });
  }
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
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
