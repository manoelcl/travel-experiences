import { BACKEND } from "../env";

const getUserData = async (id) => {
  const request = await fetch(`${BACKEND}/users/${id}`);
  const data = await request.json();

  return data.message;
};

export default getUserData;
