import { BACKEND } from "../env";

const listExperiences = async (search) => {
  try {
    console.log(search);
    const request = await fetch(`${BACKEND}/recommendations/?${search}`);
    const response = await request.json();
    return response;
  } catch (err) {
    throw err;
  }
};

export default listExperiences;
