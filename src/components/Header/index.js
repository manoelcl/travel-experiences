import "./index.css";

const Header = ({ children, cName }) => {
  return <header className={`large ${cName}`}>{children}</header>;
};

export default Header;
