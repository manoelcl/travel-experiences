import "./index.css";
import { useContext, useEffect, useState } from "react";
import loginService from "../../services/loginService";
import registerService from "../../services/registerService";
import { UserContext } from "../../helpers/Context";
import InteractionBackground from "../InteractionBackground";

export const LoginMenu = ({ callbackEvent }) => {
  const [register, setRegister] = useState("Login");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { setToken } = useContext(UserContext);

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const loginHandler = async (data) => {
    const response = await loginService(data);
    if (response.status === "ok") {
      setToken(response.data.token);
    } else {
      console.log("login failed");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    switch (register) {
      case "Login":
        loginHandler({ email: formData.email, password: formData.password });
        break;
      case "Signup":
        if (formData.password !== formData.password2) {
          console.log("Passwords must be equal");
          return;
        }
        registerService({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: "user",
        });

        break;
      case "Recover":
        console.log("To be implemented");
        break;
      default:
        console.log("Something went wrong!");
    }
    console.log("data sent");
  };

  useEffect(() => console.log(formData), [formData]);

  return (
    <InteractionBackground callbackEvent={callbackEvent}>
      <div className="login-menu">
        <h3>{register}</h3>
        <form onSubmit={submitHandler}>
          {register === "Signup" ? (
            <>
              <label htmlFor="username">User Name</label>
              <input
                onChange={inputHandler}
                id="username"
                name="username"
                type="text"
                maxLength={100}
                required
              />
            </>
          ) : null}
          <label htmlFor="email">Email</label>
          <input
            onChange={inputHandler}
            autoComplete="none"
            name="email"
            id="email"
            type="email"
            maxLength={100}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={inputHandler}
            id="password"
            name="password"
            type="password"
            maxLength={100}
            required
          />
          {register === "Signup" ? (
            <>
              <label htmlFor="password2">Password</label>
              <input
                onChange={inputHandler}
                id="password2"
                name="password2"
                type="password"
                maxLength={100}
                required
              />
            </>
          ) : null}
          <button>Send</button>
        </form>
        {register !== "Signup" ? (
          <p>
            Or <span onClick={() => setRegister("Signup")}>signup</span> to our
            page
          </p>
        ) : (
          <p>
            Back to <span onClick={() => setRegister("Login")}>login</span>
          </p>
        )}
        {register === "Login" ? (
          <p>
            Did you forget your{" "}
            <span onClick={() => setRegister("Recover")}>password</span>?
          </p>
        ) : null}
      </div>
    </InteractionBackground>
  );
};
