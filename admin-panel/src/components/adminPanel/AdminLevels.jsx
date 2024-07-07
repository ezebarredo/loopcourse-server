import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "/src/App.css";

export default function AdminLevels() {
  const getApiLevels = "http://localhost:4000/api/levels";
  const [allLevels, setAllLevels] = useState(null);

  useEffect(() => {
    const asyncFn = async () => {
      try {
        const response = await fetch(getApiLevels);
        if (!response.ok) {
          throw new Error("Network response failed");
        }
        const data = await response.json();
        setAllLevels(data.getAllLevels);
        console.log(data.getAllLevels);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    asyncFn();
  }, []);

  return (
    <>
      {/*============= cards start ===============*/}
      <ul className="cards">
        {allLevels &&
          allLevels.map(({ id, title }) => {
            return (
              <li key={id}>
                <Link to={"/admin/dashboard/levels/1"}>
                  <span className="info">
                    <h4 style={{ color: "black" }}>
                      id: {id}
                      <br />
                      Title: {title}
                    </h4>
                  </span>
                </Link>
              </li>
            );
          })}
      </ul>
      {/*============= cards close ===============*/}
    </>
  );
}
