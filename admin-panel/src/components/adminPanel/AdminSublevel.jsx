import "/src/App.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Sublevels, cards, questions and answers
export default function AdminLevel() {
  let { levelId, sublevelId } = useParams();
  const [subLevel, setSubLevel] = useState(null);

  useEffect(() => {
    const getApiSubLevel = `http://localhost:4000/api/levels/${levelId}/sublevels/${sublevelId}`;
    const asyncFn = async () => {
      try {
        const response = await fetch(getApiSubLevel);
        if (!response.ok) {
          throw new Error("Network response failed");
        }
        const data = await response.json();
        setSubLevel(data.getSublevel);
        console.log(data.getSublevel);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    asyncFn();
  }, [levelId, sublevelId]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleQuestionTitleChange = (e) => {
    const title = e.target.value;
    setSubLevel((state) => ({
      ...state,
      question: { ...state.question, title },
    }));
  };

  return (
    <>
      {subLevel && (
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleQuestionTitleChange}
            type="text"
            value={subLevel.question.title}
          />
        </form>
      )}
      {/*============= cards start ===============*/}
      <ul className="cards">
        {subLevel &&
          subLevel.cards.map(({ id, front, back }) => {
            return (
              <li key={id}>
                <i className="bx bx-group" />
                <span className="info">
                  <h4 style={{ color: "black" }}>
                    id: {id}
                    <br />
                    {subLevel.title}
                    <br />
                    Front: {front}
                    <br />
                    Back: {back}
                  </h4>
                </span>
              </li>
            );
          })}
        {subLevel &&
          subLevel.question.answers.map(({ id, answer }) => {
            return (
              <li key={id}>
                <i className="bx bx-group" />
                <span className="info">
                  <h4 style={{ color: "black" }}>
                    id: {id}
                    <br />
                    {subLevel.question.title}
                    <br />
                    {answer}
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
