import { BACKEND } from "../env";

const getUserDataService = async (id) => {
  const request = await fetch(`${BACKEND}/users/${id}`);
  const data = await request.json();

  return data.message;
};

export default getUserDataService;
