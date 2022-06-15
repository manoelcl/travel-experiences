import "./index.css";

export const Main = ({ children, cName }) => {
  return <main className={cName}>{children}</main>;
};
