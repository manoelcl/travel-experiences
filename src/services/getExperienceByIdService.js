import { BACKEND } from "../env";

const getExperienceByIdService = async (id) => {
  try {
    console.log(id);
    const request = await fetch(`${BACKEND}/recommendations/${id}`);
    const data = await request.json();
    console.log(data.message);
    return data.message;
  } catch (err) {
    throw err;
  }
};

export default getExperienceByIdService;
