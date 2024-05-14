import { Link, Outlet } from "react-router-dom";
import Footer from "../Footer";

const navStyle = {
  padding: "20px",
  display: "flex",
  gap: "10px",
};

export default function Nav() {
  return (
    <>
      <div
        style={{
          padding: navStyle.padding,
          display: navStyle.display,
          gap: navStyle.gap,
        }}
      >
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/Contact"}>Contact</Link>
      </div>
      <div
        style={{
          padding: navStyle.padding,
          display: navStyle.display,
          gap: navStyle.gap,
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
