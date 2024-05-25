import "/src/App.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminLevel() {
  let { levelId } = useParams();
  const [level, setLevel] = useState(null);

  useEffect(() => {
    const getApiLevel = `http://localhost:4000/api/levels/${levelId}`;
    const asyncFn = async () => {
      try {
        const response = await fetch(getApiLevel);
        if (!response.ok) {
          throw new Error("Network response failed");
        }
        const data = await response.json();
        setLevel(data.getLevel);
        console.log(data.getLevel);
        // console.log(data.getLevel.subLevels);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    asyncFn();
  }, [levelId]);

  return (
    <>
      {/*============= cards start ===============*/}
      <ul className="cards">
        {level &&
          level.subLevels.map(({ id, title, audio }) => {
            return (
              <li key={id}>
                <i className="bx bx-group" />
                <span className="info">
                  <h4 style={{ color: "black" }}>
                    id: {id}
                    <br />
                    {level.title}
                    <br />
                    {title}
                    <br />
                    {audio}
                  </h4>{" "}
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
