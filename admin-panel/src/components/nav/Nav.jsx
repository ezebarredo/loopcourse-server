import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <nav className="sidebarnav">
        <div className="topnav">
          <NavLink to={"/"} className="nav-link">
            Home
          </NavLink>
          <NavLink to={"/about"} className="nav-link">
            About
          </NavLink>
          <NavLink to={"/admin/dashboard"} className="nav-link">
            Admin Panel
          </NavLink>
          <NavLink to={"/contact"} className="nav-link">
            Contact
          </NavLink>
        </div>
      </nav>
    </>
  );
}
