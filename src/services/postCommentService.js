import { BACKEND } from "../env";

const postCommentService = async (id, data, token) => {
  try {
    const request = await fetch(`${BACKEND}/recommendations/${id}/comment`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: "bearer " + token,
      },
    });
    const response = await request.json();
    console.log(response);
    return response;
  } catch (err) {
    throw err;
  }
};

export default postCommentService;
