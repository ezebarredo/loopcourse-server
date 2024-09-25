import "/src/App.css";
import { NavLink, useLocation, useParams } from "react-router-dom";

// Levels / 1 / Sublevels / 1 / Cards / 1
// Levels / 1 / Sublevels / 1 / Cards / 1 / Questions / 1 / Answers

// Levels / 1
// <Link to={`/admin/dashboard/levels/${levelId}`} state={{ fromLevels: true }} />;

// let levelId = 1;
// let subLevelId = 1;
// let path = `admin/dashboard/levels/${levelId}/sublevels/${subLevelId}/cards`;

// const crumbsSublevels = path.includes("sublevels") ? " / sublevels" : "";
// const crumbsSublevelId = path.includes(`sublevels/${subLevelId}`)
//   ? ` / ${subLevelId}`
//   : "";
// const crumbsCards = path.includes("cards") ? " / cards" : "";

// const crumbs = crumbsSublevels + crumbsSublevelsId + crumbsCards;

export default function Breadcrumb() {
  let { levelId, sublevelId } = useParams();
  const location = useLocation();
  const path = location.pathname;
  const crumbsLevels = path.includes("dashboard" || "levels") ? "Levels" : "";
  const crumbsLevelId = path.includes(levelId) ? `/ ${levelId}` : "";
  const crumbsSublevels = path.includes("sublevels") ? "/ Sublevels" : "";
  const crumbsSublevelId = path.includes(sublevelId) ? `/ ${sublevelId}` : "";
  const crumbsCards = path.includes("cards") ? "/ Cards" : "";

  return (
    <>
      {/* Nav Breadcrumb starts */}
      <div id="breadcrumb">
        <nav>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""
            }
          >
            {crumbsLevels}
          </NavLink>
          <NavLink
            to={`/admin/dashboard/levels/${levelId}`}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""
            }
          >
            {crumbsLevelId}
          </NavLink>
          <NavLink
            to={`/admin/dashboard/levels/${levelId}/sublevels`}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""
            }
          >
            {crumbsSublevels}
          </NavLink>
          <NavLink
            to={`/admin/dashboard/levels/${levelId}/sublevels/${sublevelId}`}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""
            }
          >
            {crumbsSublevelId}
          </NavLink>
          <NavLink
            to={`/admin/dashboard/levels/${levelId}/sublevels/${sublevelId}/cards`}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""
            }
          >
            {crumbsCards}
          </NavLink>
          <div style={{ marginLeft: "auto" }}>
            <button>Logout</button>
          </div>
        </nav>
      </div>
      {/* Nav Breadcrumb ends */}

      {/* <div id="sidebarnav">
        <nav>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""
            }
          >
            Levels
          </NavLink>
          /
          {crumb === `/admin/dashboard/levels/${levelId}` ||
          `/admin/dashboard/levels/${levelId}/sublevels` ? (
            <NavLink
              to={`/admin/dashboard/levels/${levelId}`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              {levelId}
            </NavLink>
          ) : (
            ""
          )}
          /
          {crumb ===
          `/admin/dashboard/levels/${levelId}/sublevels/${sublevelId}` ? (
            <NavLink
              to={`/admin/dashboard/levels/${levelId}/sublevels/${sublevelId}`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Sublevels
            </NavLink>
          ) : (
            ""
          )}
          /
          {crumb ===
            `/admin/dashboard/levels/${levelId}/sublevels/${sublevelId}` ||
          crumb === `/admin/dashboard/levels/${levelId}/sublevels/` ? (
            <NavLink
              to={`/admin/dashboard/levels/${levelId}/sublevels/${sublevelId}`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              {sublevelId}
            </NavLink>
          ) : (
            ""
          )}
          /
          {crumb ===
            `/admin/dashboard/levels/${levelId}/sublevels/${sublevelId}/cards` ||
          crumb ===
            `/admin/dashboard/levels/${levelId}/sublevels/${sublevelId}/cards` ? (
            <NavLink
              to={`/admin/dashboard/levels/${levelId}/sublevels/${sublevelId}/cards`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Cards
            </NavLink>
          ) : (
            ""
          )}
          <NavLink to="/admin/dashboard/sublevels/1/cards">Cards</NavLink>
          <NavLink
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
        </NavLink>
        </nav>
      </div> */}
    </>
  );
}
