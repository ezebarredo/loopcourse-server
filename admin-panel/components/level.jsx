import { useState } from "react";
import "/src/App.css";

export default function LevelUI() {
  const [data, setData] = useState(null);
  const [levelTitle, setlevelTitle] = useState("");

  const handleLevelTitle = (event) => {
    setlevelTitle((levelTitle) => event.target.value);
  };

  const handleSubmitLevel = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/:levelId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: levelTitle }),
      });
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      const data = await response.json();
      setData(data.newLevel.title);
      console.log("Response from backend:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h1>Admin panel</h1>
      <div className="card">
        <form onSubmit={handleSubmitLevel}>
          <label>
            Enter a level title to be created:
            <input type="text" value={levelTitle} onChange={handleLevelTitle} />
            <button type="submit">Submit</button>
          </label>
          <p>{data ? `New level create with title: ${data}` : ""}</p>
        </form>
      </div>
      <p className="read-the-docs"></p>
    </>
  );
}
