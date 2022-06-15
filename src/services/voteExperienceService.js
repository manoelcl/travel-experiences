import { BACKEND } from "../env";

const voteExperienceService = async (id, rating, token) => {
  try {
    const request = await fetch(
      `${BACKEND}/recommendations/${id}/vote?rating=${rating}`,
      {
        method: "POST",
        headers: {
          Authorization: "bearer " + token,
        },
      }
    );
    const response = await request.json();
    console.log(response);
    return response;
  } catch (err) {
    throw err;
  }
};
export default voteExperienceService;
