import "./index.css";

const UserMenu = () => {
  let user;
  return (
    <div className="user-menu">
      {user ? (
        <button>Logout</button>
      ) : (
        <>
          <button>Login</button>
        </>
      )}
    </div>
  );
};
export default UserMenu;
