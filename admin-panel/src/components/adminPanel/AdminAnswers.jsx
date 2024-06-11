import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "/src/App.css";

export default function AdminAnswers() {
  let { questionId } = useParams();
  const getApiAnswers = `http://localhost:4000/api/questions/${questionId}/answers`;
  const [allAnswers, setAllAnswers] = useState(null);

  useEffect(() => {
    const asyncFn = async () => {
      try {
        const response = await fetch(getApiAnswers);
        if (!response.ok) {
          throw new Error("Network response failed");
        }
        const data = await response.json();
        setAllAnswers(data.getAllAnswers);
        console.log(data.getAllAnswers);
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
        {allAnswers &&
          allAnswers.map(({ id, answer }) => {
            return (
              <li key={id}>
                <i className="bx bx-group" />
                <span className="info">
                  <h4 style={{ color: "black" }}>
                    id: {id}
                    <br />
                    Answer: {answer}
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
