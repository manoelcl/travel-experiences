import { BACKEND } from "../env";

const loginService = async (data) => {
  try {
    const request = await fetch(`${BACKEND}/users/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();
    console.log(response);
    return response;
  } catch (err) {
    throw err;
  }
};

export default loginService;
