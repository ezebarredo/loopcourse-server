import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "/src/App.css";
import Modal from "../shared/Modal";

//TODO: print all answers with edit btn opening the modal. ✔️
// new API for answers = api/answers/answerId -> PATCH ✔️
// Nicer design on inputs ✔️
// navLink https://reactrouter.com/en/main/components/nav-link
// Nav Levels and sublevels click and redirect to edit levels and sublevels.

export default function AdminCards() {
  let { sublevelId } = useParams();
  const API_URL_CARDS = `http://localhost:4000/api/sublevels/${sublevelId}/cards`;
  const API_URL_CARDS_PATCH = `http://localhost:4000/api/cards`;
  const [allCards, setAllCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chosenCard, setChosenCard] = useState(null);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    const asyncFn = async () => {
      try {
        const response = await fetch(API_URL_CARDS);
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
  }, [sublevelId]);

  // PATCH data
  const patchCard = async () => {
    try {
      const response = await fetch(`${API_URL_CARDS_PATCH}/${chosenCard?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          front,
          back,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAllCards((state) =>
        state.map((card) =>
          card.id === chosenCard.id ? { ...card, front, back } : card
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onEditClick = (card) => {
    setIsModalOpen(true);
    setChosenCard(card);
    setFront(card.front);
    setBack(card.back);
  };

  const handleFrontNameChange = (e) => {
    const newFront = e.target.value;
    setFront(newFront);
  };
  const handleBackNameChange = (e) => {
    const newBack = e.target.value;
    setBack(newBack);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patchCard();
  };

  return (
    <>
      {" "}
      {/*============= cards start ===============*/}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* Card Front and Back Name  */}
        <br />
        <form onSubmit={handleSubmit} className="modalForm">
          <p style={{ color: "black" }}>Edit</p>
          <br />
          <p style={{ color: "black" }}>Front card:</p>
          <input type="text" value={front} onChange={handleFrontNameChange} />
          <br />
          <p style={{ color: "black" }}>Back card:</p>
          <input type="text" value={back} onChange={handleBackNameChange} />
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </Modal>
      {/* Modal Ends */}
      <ul className="cards">
        {allCards &&
          allCards.map((card) => {
            const { id, front, back } = card;
            return (
              <li key={id}>
                <span className="info">
                  <h4 style={{ color: "black" }}>
                    id: {id}
                    <br />
                    Front: {front}
                    <br />
                    Back: {back}
                    <br />
                  </h4>
                </span>
                <br />
                <button onClick={() => onEditClick(card)}>Edit</button>
              </li>
            );
          })}
      </ul>
      {/*============= cards close ===============*/}
    </>
  );
}
