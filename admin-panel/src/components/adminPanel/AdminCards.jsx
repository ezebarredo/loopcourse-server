import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "/src/App.css";

export default function AdminCards() {
  let { sublevelId } = useParams();
  const getApiCards = `http://localhost:4000/api/sublevels/${sublevelId}/cards`;
  const [allCards, setAllCards] = useState(null);

  useEffect(() => {
    const asyncFn = async () => {
      try {
        const response = await fetch(getApiCards);
        if (!response.ok) {
          throw new Error("Network response failed");
        }
        const data = await response.json();
        setAllCards(data.getAllCards);
        console.log(data.getAllCards);
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
        {allCards &&
          allCards.map(({ id, front, back }) => {
            return (
              <li key={id}>
                <i className="bx bx-group" />
                <span className="info">
                  <h4 style={{ color: "black" }}>
                    id: {id}
                    <br />
                    Front: {front}
                    <br />
                    Back: {back}
                    <br />
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
