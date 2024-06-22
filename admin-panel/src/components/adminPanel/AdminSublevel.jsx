import "/src/App.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Sublevels, cards, questions and answers
export default function AdminSubLevel() {
  let { levelId, sublevelId } = useParams();
  const [subLevel, setSubLevel] = useState(null);
  const [subLevelName, setSubLevelName] = useState(null);

  const getApiSubLevel = `http://localhost:4000/api/levels/${levelId}/sublevels/${sublevelId}`;

  useEffect(() => {
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

  const patchSublevel = async () => {
    try {
      const response = await fetch(getApiSubLevel, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: subLevel.title,
          audio: subLevel.audio,
          question: {
            id: subLevel.question.id,
            title: subLevel.question.title,
            answers: subLevel.question.answers,
          },
          cards: subLevel.cards,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSubLevelName(subLevel.title);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patchSublevel();
    console.log(
      `New names updates are: ${subLevel.title}, ${subLevel.audio} & ${subLevel.question.title}`
    );
  };

  const handleSublevelTitleChange = (e) => {
    const title = e.target.value;
    setSubLevel((state) => ({
      ...state,
      title,
    }));
  };

  const handleSubLevelAudioChange = (e) => {
    const audio = e.target.value;
    setSubLevel((state) => ({
      ...state,
      audio,
    }));
  };

  const handleQuestionTitleChange = (e) => {
    const title = e.target.value;
    setSubLevel((state) => ({
      ...state,
      question: { ...state.question, title },
    }));
  };

  const handleAnswerTitleChange = (e, id) => {
    const title = e.target.value;
    setSubLevel((state) => ({
      ...state,
      question: {
        ...state.question,
        answers: state.question.answers.map((answer) =>
          answer.id === id ? { ...answer, answer: title } : answer
        ),
      },
    }));
  };

  const handleFrontTitleChange = (e, id) => {
    const title = e.target.value;
    setSubLevel((state) => ({
      ...state,
      cards: state.cards.map((card) =>
        card.id === id ? { ...card, front: title } : card
      ),
    }));
  };

  return (
    <>
      {/* Subtitle, Audio and question title form: */}
      <strong>
        {" "}
        <p style={{ color: "black", marginBottom: "10px" }}>
          Edition dashboard:{" "}
        </p>
      </strong>
      {subLevel && (
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "10px" }}>
            <li>
              <p style={{ color: "black" }}>Subtitle name:</p>
              <input
                type="text"
                value={subLevel.title}
                onChange={handleSublevelTitleChange}
              />
            </li>
            <li>
              <p style={{ color: "black" }}>Audio name:</p>
              <input
                onChange={handleSubLevelAudioChange}
                type="text"
                value={subLevel.audio}
              />
            </li>
            <li>
              <p style={{ color: "black" }}>Question name:</p>
              <input
                onChange={handleQuestionTitleChange}
                type="text"
                value={subLevel.question.title}
              />
            </li>
            {/* Asnwer title */}
            {subLevel.question.answers.map(({ id, answer }) => {
              return (
                <li key={id}>
                  <p style={{ color: "black" }}>Answer {id} name:</p>
                  <input
                    onChange={(e) => handleAnswerTitleChange(e, id)}
                    type="text"
                    value={answer}
                  />
                </li>
              );
            })}
          </div>
          {/* Card Front Name  */}
          <br />
          <strong>
            <p style={{ color: "black" }}>Cards names:</p>
          </strong>
          <br />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "200px 200px 200px 200px 200px",
              gap: "10px",
            }}
          >
            {subLevel &&
              subLevel.cards.map(({ id, front }) => {
                return (
                  <li key={id}>
                    <p style={{ color: "black" }}>Card {id} Front name:</p>
                    <input
                      onChange={(e) => handleFrontTitleChange(e, id)}
                      type="text"
                      value={front}
                    />
                    <br />
                  </li>
                );
              })}
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
      <h4 style={{ color: "black" }}>
        {subLevelName && `New SubLevel Name: ${subLevelName}✔️`}
      </h4>
      {/*============= cards start ===============*/}
      <ul className="cards">
        {/* Updating subLevel per Id*/}
        {/* {subLevel && (
          <li key={subLevel.id}>
            <i className="bx bx-group" />
            <span className="info">
              <h4 style={{ color: "black" }}>
                id: {subLevel.id}
                <br />
                {subLevel.title}
                <br />
                {subLevel.audio}
                <br />
                {subLevel.question.title}
              </h4>
            </span>
          </li>
        )} */}
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
                    {subLevel.audio}
                    <br />
                    Front: {front}
                    <br />
                    Back: {back}
                    <br />
                    Q: {subLevel.question.title}
                  </h4>
                </span>
              </li>
            );
          })}
        {/* {subLevel &&
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
          })} */}
      </ul>
      {/*============= cards close ===============*/}
    </>
  );
}
