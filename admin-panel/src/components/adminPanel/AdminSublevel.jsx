import "/src/App.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Sublevels, cards, questions and answers
export default function AdminLevel() {
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
          question: { title: subLevel.question.title },
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

  return (
    <>
      {/* Subtitle, Audio and question title form: */}
      <strong>
        {" "}
        <p style={{ color: "black", marginBottom: "10px" }}>
          Enter a new Sublevel, Audio or Question name:{" "}
        </p>
      </strong>
      {subLevel && (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
          <p style={{ color: "black" }}>Subtitle name:</p>
          <input
            type="text"
            value={subLevel.title}
            onChange={handleSublevelTitleChange}
          />
          <p style={{ color: "black" }}>Audio name:</p>
          <input
            onChange={handleSubLevelAudioChange}
            type="text"
            value={subLevel.audio}
          />
          <p style={{ color: "black" }}>Question name:</p>
          <input
            onChange={handleQuestionTitleChange}
            type="text"
            value={subLevel.question.title}
          />
          <input type="submit" />
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
