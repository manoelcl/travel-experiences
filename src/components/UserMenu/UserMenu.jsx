import { useContext, useState } from "react";
import ProfileSmall from "../ProfileSmall";
import LoginMenu from "../LoginMenu";
import "./index.css";
import { UserContext } from "../../helpers/Context";

export const UserMenu = () => {
  const { myUser, logout } = useContext(UserContext);
  const [login, setLogin] = useState(false);

  return (
    <div className="user-menu">
      {myUser ? (
        <>
          <ProfileSmall user={myUser}></ProfileSmall>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => setLogin(true)}>Login</button>
          {login ? (
            <LoginMenu callbackEvent={() => setLogin(false)}></LoginMenu>
          ) : null}
        </>
      )}
    </div>
  );
};
