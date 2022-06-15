import { BACKEND } from "../env";

const postExperienceService = async (data, token) => {
  try {
    console.log(data);
    const request = await fetch(`${BACKEND}/recommendations`, {
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

export default postExperienceService;
