import "/src/App.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

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
                <Link to={"/admin/dashboard/levels/1/sublevels/1"}>
                  <span className="info">
                    <h4 style={{ color: "black" }}>
                      {id}
                      <br />
                      {title}
                      <br />
                      {audio}
                      <br />
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
