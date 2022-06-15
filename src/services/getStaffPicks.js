import { BACKEND } from "../env";

const getStaffPicks = async () => {
  const request = await fetch(`${BACKEND}/recommendations`);
  const { data } = await request.json();
  console.log(data.message);
  return data;
};

export default getStaffPicks;
