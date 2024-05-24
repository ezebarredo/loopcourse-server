import "/src/App.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminLevel() {
  let { levelId } = useParams();
  const [level, setlevel] = useState(null);

  useEffect(() => {
    const getApiLevel = `http://localhost:4000/api/levels/${levelId}`;
    const asyncFn = async () => {
      try {
        const response = await fetch(getApiLevel);
        if (!response.ok) {
          throw new Error("Network response failed");
        }
        const data = await response.json();
        setlevel(data.getLevel.title);
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
        <li>
          <i className="bx bx-group" />
          <span className="info">
            <h4 style={{ color: "black" }}>This is: {level}</h4> : ""
          </span>
        </li>
      </ul>
      {/*============= cards close ===============*/}
    </>
  );
}
