import "./index.css";

export const Header = ({ children, cName }) => {
  return <header className={`large ${cName}`}>{children}</header>;
};
