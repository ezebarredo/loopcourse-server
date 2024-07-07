import "/src/App.css";
import { NavLink, Outlet, useParams } from "react-router-dom";

// function Breadcrumbnav() {
//   return (
//     <Breadcrumb>
//       <div style={{ display: "flex", gap: "5px" }}>
//         <Breadcrumb.Item href="/admin/dashboard/">Dashboard /</Breadcrumb.Item>
//         <Breadcrumb.Item href="/admin/dashboard/levels">
//           Levels /
//         </Breadcrumb.Item>
//         <Breadcrumb.Item href="/admin/dashboard/levels/1/sublevels">
//           Sublevels /
//         </Breadcrumb.Item>
//         <Breadcrumb.Item href="/admin/dashboard/sublevels/1/cards">
//           Cards /
//         </Breadcrumb.Item>
//         <Breadcrumb.Item href="/admin/dashboard/levels/1">
//           Edit Level /
//         </Breadcrumb.Item>
//         <Breadcrumb.Item href="/admin/dashboard/levels/1/sublevels/1">
//           Edit Sublevel /
//         </Breadcrumb.Item>
//       </div>
//     </Breadcrumb>
//   );
// }

function BreadcrumbNav() {
  return (
    <>
      <nav className="sidebarnav">
        <NavLink to="/admin/dashboard/">Dashboard</NavLink>
        <NavLink to="/admin/dashboard/levels">Levels</NavLink>
        {/* <NavLink to="/admin/dashboard/levels/1/sublevels">Sublevels</NavLink> */}
        {/* <NavLink to="/admin/dashboard/sublevels/1/cards">Cards</NavLink> */}
        {/* <NavLink
          to="/admin/dashboard/levels/1"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Edit Level
        </NavLink>
        <NavLink
          to="/admin/dashboard/levels/1/sublevels/1"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Edit Sublevel
        </NavLink> */}
      </nav>
    </>
  );
}

export default function AdminLayout() {
  let { levelId } = useParams();
  return (
    <>
      {/* =============Sidebar Start================ */}
      <nav className="sidebarnav">
        <div className="sidebar">
          <NavLink to={"/admin/dashboard"}>
            {/* <img src="./img/logo-1.png" alt="" />  */}
            <span className="logo"> Admin Panel</span>
          </NavLink>
          <ul style={{ marginLeft: "70px", marginTop: "50px" }}>
            <li>
              <NavLink to={"/admin/dashboard/"}>
                <i className="bx bxs-dashboard" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/dashboard/levels"}>
                <i className="bx bx-video" />
                Levels
              </NavLink>
            </li>
            <li>
              <NavLink to={`/admin/dashboard/levels/1/sublevels`}>
                <i className="bx bx-video" />
                Sublevels
              </NavLink>
            </li>
            <li>
              <NavLink to={`/admin/dashboard/sublevels/1/cards`}>
                <i className="bx bx-video" />
                Cards
              </NavLink>
            </li>
            <li>
              <NavLink to={`/admin/dashboard/levels/1`}>
                <i className="bx bx-video" />
                Edit Level ✏️
              </NavLink>
            </li>
            <li>
              <NavLink to={`/admin/dashboard/levels/1/sublevels/1`}>
                <i className="bx bx-video" />
                Edit Sublevel ✏️
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* =============Sidebar Close================ */}
      {/* BreadcrumbNav bar */}
      <div className="content">
        <i className="bx bx-menu" />
        <BreadcrumbNav />
        {/* BreadcrumbNav bar close */}
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
