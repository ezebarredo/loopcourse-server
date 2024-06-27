import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "/src/App.css";
import Modal from "../shared/Modal";

export default function AdminCards() {
  let { sublevelId } = useParams();
  const getApiCards = `http://localhost:4000/api/sublevels/${sublevelId}/cards`;
  const [allCards, setAllCards] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chosenCardId, setChosenCardId] = useState(null);

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

  const onEditClick = (id) => {
    setIsModalOpen(true);
    setChosenCardId(id);
  };

  return (
    <>
      {" "}
      {/*============= cards start ===============*/}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* Card Front and Back Name  */}
        <br />
        <form>
          <p style={{ color: "black" }}>Cards name:</p>
          <input
            type="text"
            value={
              allCards.find((card) => card.id === chosenCardId)?.front || ""
            }
          />
          <br />
          <input
            type="text"
            value={
              ""
              // allCards.find((card) => card.id === chosenCardId)?.back || ""
            }
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </Modal>
      {/* Modal Ends */}
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
                <button onClick={() => onEditClick(id)}>Edit</button>
              </li>
            );
          })}
      </ul>
      {/*============= cards close ===============*/}
    </>
  );
}
