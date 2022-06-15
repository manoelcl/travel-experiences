import "./index.css";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../helpers/Context";

import getCommentsService from "../../services/getCommentsService";
import postCommentService from "../../services/postCommentService";

import ProfileSmall from "../ProfileSmall";

export const Comments = ({ id }) => {
  const [comments, setComments] = useState();
  const { token } = useContext(UserContext);

  useEffect(() => {
    const asyncRequest = async () => {
      console.log(id);
      const request = await getCommentsService(id);
      console.log(request);
      if (request.status === "ok") {
        setComments(request.data);
      }
    };
    asyncRequest();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    console.log("submit", data);
    postCommentService(id, data, token);
  };

  return (
    <div className="comments">
      {comments
        ? comments.map((comment) => (
            <article key={comment.commentId} className="comment">
              <p>{comment.content}</p>{" "}
              <ProfileSmall
                user={{ username: comment.username, userId: comment.userId }}
              />
            </article>
          ))
        : null}
      <form onSubmit={submitHandler}>
        <input
          type="text"
          id="content"
          name="content"
          placeholder="Type a new comment..."
        />
      </form>
    </div>
  );
};
