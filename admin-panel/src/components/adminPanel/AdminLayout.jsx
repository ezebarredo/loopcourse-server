import "/src/App.css";
import { Link, Outlet } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function Breadcrumbnav() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item active>Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/admin/dashboard/">Dashboard</Breadcrumb.Item>
      <Breadcrumb.Item href="/admin/dashboard/levels">
        Get Levels
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default function AdminLayout() {
  return (
    <>
      {/* =============Sidebar Start================ */}
      <div className="sidebar">
        <Breadcrumbnav />
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
