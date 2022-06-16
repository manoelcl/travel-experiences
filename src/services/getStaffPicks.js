import { BACKEND } from "../env";

const getStaffPicks = async () => {
  const request = await fetch(`${BACKEND}/recommendations/staffpicks`);
  const { data } = await request.json();

  return data;
};

export default getStaffPicks;
