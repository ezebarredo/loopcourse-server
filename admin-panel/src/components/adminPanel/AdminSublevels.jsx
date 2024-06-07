import "/src/App.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

//TODO: Check audio title

// Sublevels, cards, questions and answers
export default function AdminSublevels() {
  let { levelId } = useParams();
  const [subLevel, setSubLevel] = useState(null);
  const getApiSubLevels = `http://localhost:4000/api/levels/${levelId}/sublevels/`;

  useEffect(() => {
    const asyncFn = async () => {
      try {
        const response = await fetch(getApiSubLevels);
        if (!response.ok) {
          throw new Error("Network response failed");
        }
        const data = await response.json();
        setSubLevel(data.getAllSublevels.subLevels);
        console.log(data.getAllSublevels.subLevels);
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
        {subLevel &&
          subLevel.map(({ id, title, audio }) => {
            return (
              <li key={id}>
                <i className="bx bx-group" />
                <span className="info">
                  <h4 style={{ color: "black" }}>
                    id: {id}
                    <br />
                    {title}
                    <br />
                    {audio}
                    <br />
                  </h4>
                </span>
              </li>
            );
          })}
      </ul>
      {/*============= cards close ===============*/}
    </>
  );
}
