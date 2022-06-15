import { BACKEND } from "../env";

const getCommentsService = async (id) => {
  try {
    const request = await fetch(`${BACKEND}/recommendations/${id}/comment`);
    const response = await request.json();

    return response;
  } catch (err) {
    throw err;
  }
};
export default getCommentsService;
