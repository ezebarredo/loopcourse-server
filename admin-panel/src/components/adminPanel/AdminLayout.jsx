import "/src/App.css";
import { Link, Outlet, useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function Breadcrumbnav() {
  return (
    <Breadcrumb>
      <div style={{ display: "flex", gap: "5px" }}>
        <Breadcrumb.Item href="/admin/dashboard/">Dashboard /</Breadcrumb.Item>
        <Breadcrumb.Item href="/admin/dashboard/levels">
          Levels /
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/admin/dashboard/levels/1/sublevels">
          Sublevels /
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/admin/dashboard/sublevels/1/cards">
          Cards /
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/admin/dashboard/levels/1">
          Edit Level /
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/admin/dashboard/levels/1/sublevels/1">
          Edit Sublevel /
        </Breadcrumb.Item>
      </div>
    </Breadcrumb>
  );
}

export default function AdminLayout() {
  let { levelId } = useParams();
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
              Levels
            </Link>
          </li>
          <li className="active">
            <Link to={`/admin/dashboard/levels/1/sublevels`}>
              <i className="bx bx-video" />
              Sublevels
            </Link>
          </li>
          <li className="active">
            <Link to={`/admin/dashboard/sublevels/1/cards`}>
              <i className="bx bx-video" />
              Cards
            </Link>
          </li>
          <li className="active">
            <Link to={`/admin/dashboard/levels/1`}>
              <i className="bx bx-video" />
              Edit Level ✏️
            </Link>
          </li>
          <li className="active">
            <Link to={`/admin/dashboard/levels/1/sublevels/1`}>
              <i className="bx bx-video" />
              Edit Sublevel ✏️
            </Link>
          </li>
        </ul>
      </div>
      {/* =============Sidebar Close================ */}
      {/* NAV bar */}
      <div className="content">
        <nav>
          <i className="bx bx-menu" />
          <Breadcrumbnav />
        </nav>
        {/* NAV bar close */}
        {/* Main Start */}
        <main>
          <Outlet />
          {/*============= cards start ===============*/}
          <ul className="cards"></ul>
          {/*============= cards close ===============*/}
        </main>
        {/* Main Close */}
      </div>
      {/* =============Content CLose================ */}
    </>
  );
}
