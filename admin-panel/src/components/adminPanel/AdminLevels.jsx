import { useState, useEffect } from "react";
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
      } catch (error) {
        console.error("Error:", error);
      }
    };
    asyncFn();
  }, []);

  return (
    <>
      {" "}
      {/*============= cards start ===============*/}
      <ul className="cards">
        {allLevels &&
          allLevels.map(({ id, title }) => {
            return (
              <li key={id}>
                <i className="bx bx-group" />
                <span className="info">
                  <h5 style={{ color: "black" }}>
                    id: {id}
                    <br />
                    Title: {title}
                  </h5>{" "}
                  : ""
                </span>
              </li>
            );
          })}
      </ul>
      {/*============= cards close ===============*/}
    </>
  );
}
