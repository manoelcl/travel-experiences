const getExperienceById = async (id) => {
  try {
    console.log(id);
    const request = await fetch(`http://127.0.0.1:4000/recommendations/${id}`);
    const data = await request.json();
    console.log(data.message);
    return data.message;
  } catch (err) {
    throw err;
  }
};

export default getExperienceById;
