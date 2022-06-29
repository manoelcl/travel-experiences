import { BACKEND } from "../env";

const getStaffPicksService = async () => {
  try {
    const request = await fetch(`${BACKEND}/recommendations/staffpicks`);
    const response = await request.json();

    return response;
  } catch (error) {
    return { error: error };
  }
};

export default getStaffPicksService;
