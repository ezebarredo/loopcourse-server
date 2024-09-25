import "/src/App.css";
import { NavLink, Outlet } from "react-router-dom";
import Breadcrumb from "./BreadCrumb";

export default function AdminLayout() {
  return (
    <>
      {/* =============Sidebar Start================ */}
      {/* <nav className="sidebarnav"> */}
      <div className="sidebar">
        <NavLink to={"/admin/dashboard"} end>
          <span className="logo"> AdminPanel</span>
        </NavLink>

        {/*<ul style={{ marginLeft: "70px", marginTop: "50px" }}>
            <li>
              <NavLink to={"/admin/dashboard/"} end>
                <i className="bx bxs-dashboard" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/dashboard/levels"} end>
                <i className="bx bx-video" />
                Levels
              </NavLink>
            </li>
            <li>
              <NavLink to={`/admin/dashboard/levels/${levelId}/sublevels`} end>
                <i className="bx bx-video" />
                Sublevels
              </NavLink>
            </li>
            <li>
              <NavLink to={`/admin/dashboard/sublevels/1/cards`} end>
                <i className="bx bx-video" />
                Cards
              </NavLink>
            </li>
          </ul> */}
      </div>
      {/* </nav> */}
      {/* =============Sidebar Close================ */}
      {/* BreadcrumbNav bar */}
      <div className="content">
        <i className="bx bx-menu" />
        <Breadcrumb />
        {/* BreadcrumbNav bar close */}
        {/* Main Start */}
        <main>
          <Outlet />
          {/*============= cards start ===============*/}
          {/* <ul className="cards"></ul> */}
          {/*============= cards close ===============*/}
        </main>
        {/* Main Close */}
      </div>

      {/* =============Content CLose================ */}
    </>
  );
}
