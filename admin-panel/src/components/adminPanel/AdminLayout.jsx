import AdminLevel from "./AdminLevel";
import "/src/App.css";
import { Link, Outlet, Routes, Route } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      {/* =============Sidebar Start================ */}
      <div className="sidebar">
        <Link to={"/admin/dashboard"} className="logo">
          <img src="./img/logo-1.png" alt="" /> Admin<span>Panel</span>
        </Link>
        <ul className="side-menu">
          <li className="active">
            <Link to={"/admin/dashboard/"}>
              <i className="bx bxs-dashboard" />
              Dashboard
            </Link>
          </li>
          <li className="active">
            <Link to={"/admin/dashboard/levels"}>
              <i className="bx bx-video" />
              GET Levels
            </Link>
          </li>
        </ul>
      </div>
      {/* =============Sidebar Close================ */}
      {/* NAV bar */}
      <div className="content">
        <nav>
          <i className="bx bx-menu" />
        </nav>
        {/* NAV bar close */}
        {/* Main Start */}
        <main>
          <Outlet />;{/*============= cards start ===============*/}
          <ul className="cards"></ul>
          {/*============= cards close ===============*/}
        </main>
        {/* Main Close */}
      </div>
      {/* =============Content CLose================ */}
    </>
  );
}
