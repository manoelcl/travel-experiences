import { BACKEND } from "../env";

const getExperienceById = async (id) => {
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

export default getExperienceById;
