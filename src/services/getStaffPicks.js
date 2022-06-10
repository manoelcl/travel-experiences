const getStaffPicks = async () => {
  const request = await fetch(`http://127.0.0.1:4000/recommendations`);
  const data = await request.json();
  console.log(data.message);
  return data.message;
};

export default getStaffPicks;
