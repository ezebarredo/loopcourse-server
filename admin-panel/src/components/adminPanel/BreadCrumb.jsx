import "/src/App.css";
import { NavLink, useLocation, useParams } from "react-router-dom";

// TODO: Levels / 1 / Sublevels

// Levels / 1 / Sublevels / 1 / Cards / 1
// Levels / 1 / Sublevels / 1 / Cards / 1 / Questions / 1 / Answers

// Levels / 1
// <Link to={`/admin/dashboard/levels/${levelId}`} state={{ fromLevels: true }} />;

export default function Breadcrumb() {
  let { levelId } = useParams();
  const location = useLocation();
  const crumb = location.pathname;
  console.log(location.pathname);

  return (
    <>
      <div id="sidebarnav">
        <nav>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""
            }
            state={{ fromLevels: true }}
          >
            Levels
          </NavLink>

          {crumb === `/admin/dashboard/levels/${levelId}` ||
          `/admin/dashboard/levels/${levelId}/sublevels` ? (
            <NavLink
              to={`/admin/dashboard/levels/${levelId}`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
              state={{ fromLevels: true }}
            >
              {levelId}
            </NavLink>
          ) : (
            ""
          )}
          {crumb ===
          `/admin/dashboard/levels/${levelId}/sublevels/${levelId}` ? (
            <NavLink
              to={`/admin/dashboard/levels/${levelId}/sublevels/${levelId}`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
              state={{ fromLevels: true }}
            >
              Sublevels
            </NavLink>
          ) : (
            ""
          )}

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
      </div>
    </>
  );
}
