import "/src/App.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminCard() {
  let { cardId } = useParams();
  const [card, setCard] = useState(null);
  const [cardName, setCardName] = useState(null);

  const getApiCard = `http://localhost:4000/api/cards/${cardId}`;

  //GET data
  useEffect(() => {
    const asyncFn = async () => {
      try {
        const response = await fetch(getApiCard);
        if (!response.ok) {
          throw new Error("Network response failed");
        }

        const data = await response.json();
        setCard(data.getCard);
        console.log(data.getCard);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    asyncFn();
  }, [cardId]);

  // PATCH data
  const patchCard = async () => {
    try {
      const response = await fetch(getApiCard, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          front: card.front,
          back: card.back,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCardName(card.title);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patchCard();
    console.log(`New cards name: ${card.front} ${card.back}`);
  };

  const handleCardFrontChange = (e) => {
    const front = e.target.value;
    setCard((state) => ({
      ...state,
      front,
    }));
  };
  const handleCardBackChange = (e) => {
    const back = e.target.value;
    setCard((state) => ({
      ...state,
      back,
    }));
  };

  return (
    <>
      <strong>
        <p style={{ color: "black", marginBottom: "10px" }}>
          Enter a new card name:{" "}
        </p>
      </strong>
      {card && (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "20px" }}>
          <p style={{ color: "black" }}>Front card name:</p>
          <br />
          <input
            type="text"
            value={card.front}
            onChange={handleCardFrontChange}
          />
          <p style={{ color: "black" }}>Back card name:</p>
          <br />
          <input
            type="text"
            value={card.back}
            onChange={handleCardBackChange}
          />
          <br />
          <input type="submit" />
        </form>
      )}
      <h4 style={{ color: "black" }}>
        {cardName && `New card Name: ${cardName} ✔️`}
      </h4>

      {/*============= cards start ===============*/}
      <ul className="cards">
        {card && (
          <li key={card.id}>
            <i className="bx bx-group" />
            <span className="info">
              <h4 style={{ color: "black" }}>
                id: {card.id}
                <br />
                {card.front}
                <br />
                {card.back}
                <br />
              </h4>
            </span>
          </li>
        )}
      </ul>
      {/*============= cards close ===============*/}
    </>
  );
}
