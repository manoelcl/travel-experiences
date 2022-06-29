import { BACKEND } from "../env";

const listExperiencesByUserIdService = async (id) => {
  try {
    console.log(id);
    const request = await fetch(`${BACKEND}/users/${id}/recommendations`);
    const response = await request.json();
    return response;
  } catch (err) {
    throw err;
  }
};

export default listExperiencesByUserIdService;
