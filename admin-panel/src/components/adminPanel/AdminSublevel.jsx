import "/src/App.css";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "../shared/Modal";

// Sublevels, cards, questions and answers
export default function AdminSubLevel() {
  let { levelId, sublevelId } = useParams();
  const API_URL_SUBLEVEL = `http://localhost:4000/api/levels/${levelId}/sublevels/${sublevelId}`;
  const API_URL_ANSWERS_PATCH = `http://localhost:4000/api/answers`;
  const [subLevel, setSubLevel] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState(null);

  useEffect(() => {
    const asyncFn = async () => {
      try {
        const response = await fetch(API_URL_SUBLEVEL);
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

  const patchSublevelAudioQuestion = async () => {
    try {
      const response = await fetch(API_URL_SUBLEVEL, {
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
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
    } catch (error) {
      console.log("Error", error);
    }
  };

  const patchAnswers = async () => {
    try {
      const response = await fetch(
        `${API_URL_ANSWERS_PATCH}/${chosenAnswer?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answer,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSubLevel((state) => ({
        ...state,
        question: {
          ...state.question,
          answers: state.question.answers.map((answerObj) =>
            answerObj.id === chosenAnswer.id
              ? { ...answerObj, answer }
              : answerObj
          ),
        },
      }));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleSubmitSublevelAudioQuestion = (e) => {
    e.preventDefault();
    patchSublevelAudioQuestion();
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    patchAnswers();
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

  const handleAnswerTitleChange = (e) => {
    const newAnswer = e.target.value;
    setAnswer(newAnswer);
  };

  const onEditClick = (oneAnswer) => {
    setIsModalOpen(true);
    setChosenAnswer(oneAnswer);
    setAnswer(oneAnswer.answer);
  };

  return (
    <>
      {/* Modal starts */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form className="modalForm" onSubmit={handleSubmitAnswer}>
          <p style={{ color: "black" }}>Edit</p>
          <br />
          <p style={{ color: "black" }}>Answer</p>
          <input
            type="text"
            value={answer}
            onChange={handleAnswerTitleChange}
          />
          <br />
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </Modal>
      {/* Modal Ends */}
      {/* Subtitle, Audio and question title form: */}
      <div className="header">
        <h1>Edit Sublevel</h1>
      </div>
      <br />
      {subLevel && (
        <form onSubmit={handleSubmitSublevelAudioQuestion}>
          <div style={{ display: "flex", gap: "10px" }}>
            <li>
              <p style={{ color: "black" }}>Name:</p>
              <input
                type="text"
                value={subLevel.title}
                onChange={handleSublevelTitleChange}
              />
            </li>
            <li>
              <p style={{ color: "black" }}>Audio:</p>
              <input
                onChange={handleSubLevelAudioChange}
                type="text"
                value={subLevel.audio}
              />
            </li>
            <li>
              <p style={{ color: "black" }}>Question:</p>
              <input
                onChange={handleQuestionTitleChange}
                type="text"
                value={subLevel.question.title}
              />
            </li>
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
      <h4 style={{ color: "black" }}></h4>
      {/*============= cards start ===============*/}
      <ul className="cards">
        {/* Updating subLevel per Id*/}
        {subLevel && (
          <li key={subLevel.id}>
            <span className="info">
              <h4 style={{ color: "black", lineHeight: "2" }}>
                Sublevel {subLevel.id}
                <br />
                {subLevel.title}
                <br />
                {subLevel.audio}
                <br />
                {subLevel.question.title}
              </h4>
            </span>
          </li>
        )}
        {/* Answers */}
        {subLevel &&
          subLevel.question.answers.map((oneAnswer) => {
            const { id, answer } = oneAnswer;
            return (
              <li key={id}>
                <span className="info">
                  <h4 style={{ color: "black" }}>
                    Answer {id}:
                    <br />
                    {answer}
                  </h4>
                </span>
                <br />
                <button onClick={() => onEditClick(oneAnswer)}>Edit</button>
              </li>
            );
          })}
      </ul>
      {/*============= cards close ===============*/}
      <ul className="cards">
        <Link
          to={`/admin/dashboard/levels/${levelId}/sublevels/${sublevelId}/cards`}
        >
          <li>
            <span className="info">
              <h3 style={{ color: "black" }}>Cards</h3>
            </span>
          </li>
        </Link>
      </ul>
    </>
  );
}
