import "/src/App.css";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminLevel() {
  let { levelId } = useParams();
  const [level, setLevel] = useState(null);

  const getApiLevel = `http://localhost:4000/api/levels/${levelId}`;

  // run call function, when (dependency)
  useEffect(() => {
    const asyncFn = async () => {
      try {
        const response = await fetch(getApiLevel);
        if (!response.ok) {
          throw new Error("Network response failed");
        }

        const data = await response.json();
        setLevel(data.getLevel);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    asyncFn();
  }, [levelId]);

  const patchLevel = async () => {
    try {
      const response = await fetch(getApiLevel, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: level.title,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLevelName(level.title);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patchLevel();
  };

  const handleLevelTitleChange = (e) => {
    const title = e.target.value;
    setLevel((state) => ({
      ...state,
      title,
    }));
  };

  return (
    <>
      <strong>
        <div className="header">
          <h1>Edit Level</h1>
        </div>
      </strong>
      {level && (
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              className="inputLevel"
              type="text"
              value={level.title}
              onChange={handleLevelTitleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
      <br />
      <br />
      <h2 style={{ color: "black" }}>Sublevels </h2>
      {/*============= cards start ===============*/}
      <ul className="cards">
        {level &&
          level.subLevels.map(({ id, title }) => {
            return (
              <li key={id}>
                <NavLink
                  to={`/admin/dashboard/levels/${levelId}/sublevels/${id}`}
                  end
                >
                  {/* <i className="bx bx-group" /> */}
                  <span className="info">
                    <h3 style={{ color: "black" }}>
                      {title}
                      <br />
                    </h3>
                  </span>
                </NavLink>
              </li>
            );
          })}
      </ul>
      {/*============= cards close ===============*/}
    </>
  );
}
