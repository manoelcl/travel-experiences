import "./index.css";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../helpers/Context";

import getCommentsService from "../../services/getCommentsService";
import postCommentService from "../../services/postCommentService";

import ProfileSmall from "../ProfileSmall";

export const Comments = ({ id }) => {
  const [comments, setComments] = useState();
  const { myUser, token } = useContext(UserContext);

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

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    console.log("submit", data);
    const response = await postCommentService(id, data, token);
    e.target.value = "";
    if (response.status === "ok") {
      comments
        ? setComments([
            { ...response.data, username: myUser.username },
            ...comments,
          ])
        : setComments([{ ...response.data, username: myUser.username }]);
      console.log(response.data.userId);
    }
    e.target.reset();
  };

  return (
    <div className="comments">
      <div className="comments-container">
        {comments
          ? comments.map((comment) => (
              <article
                key={comment.commentId}
                className={`comment ${
                  myUser?.userId === comment.userId ? "user" : null
                }`}
              >
                <p>{comment.content}</p>{" "}
                <ProfileSmall
                  user={{ username: comment.username, userId: comment.userId }}
                />
              </article>
            ))
          : null}
      </div>

      <form onSubmit={submitHandler}>
        <input
          readOnly={!myUser}
          autoComplete="off"
          type="text"
          id="content"
          name="content"
          autoFocus
          maxLength={300}
          placeholder={myUser ? "Type a new comment..." : "Login to comment"}
        />
      </form>
    </div>
  );
};
