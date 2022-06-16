import { BACKEND } from "../env";

const listNearbyService = async (search) => {
  try {
    let queryParams = new URLSearchParams(search).toString();
    const request = await fetch(
      `${BACKEND}/recommendations/nearby/?${queryParams}`
    );
    const response = await request.json();
    return response;
  } catch (err) {
    throw err;
  }
};

export default listNearbyService;
