import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import getUserDataService from "../services/getUserDataService";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  useEffect(() => {
    const asyncRequest = async (id) => {
      setMyUser(await getUserDataService(id));
    };
    if (token) {
      const myUserId = jwtDecode(token).id;
      asyncRequest(myUserId);
    }
  }, [token]);

  const logout = () => {
    setMyUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{ token, setToken, myUser, setMyUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
