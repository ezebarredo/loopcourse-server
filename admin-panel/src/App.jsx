import { useState } from "react";
import "./App.css";

function FormUI() {
  const [levelNumber, setLevelNumber] = useState(2);

  const changeLevel = (event) => {
    if (event.target.value < 11) {
      setLevelNumber((levelNumber) => event.target.value);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/levels/${levelNumber}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Response from backend:", data.getLevel);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h1>Admin panel</h1>
      <div className="card">
        <form action="submit">
          <label>
            Enter a level number Id:
            <input type="number" value={levelNumber} onInput={changeLevel} />
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </label>
        </form>
      </div>
      <p className="read-the-docs"></p>
    </>
  );
}

export default function App() {
  return <FormUI />;
}
