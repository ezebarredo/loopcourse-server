import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <div className="topnav">
        <Link to={"/"} className="nav-link">
          Home
        </Link>
        <Link to={"/about"} className="nav-link">
          About
        </Link>
        <Link to={"/admin/dashboard"} className="nav-link">
          Admin Panel
        </Link>
        <Link to={"/contact"} className="nav-link">
          Contact
        </Link>
      </div>
    </>
  );
}
