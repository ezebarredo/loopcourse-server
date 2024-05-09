import { useState } from "react";
import "/src/App.css";

export default function SubLevelCreate() {
  const [data, setData] = useState(null);
  const [subLevelTitle, SetSubLevelTitle] = useState("");
  const [subLevelAudio, setSubLevelAudio] = useState("");

  const handleSubLevelTitle = (event) => {
    SetSubLevelTitle((subLevelTitle) => event.target.value);
  };

  const handleSubLevelAudio = (event) => {
    setSubLevelAudio((subLevelAudio) => event.target.value);
  };

  const handleSubmitSublevel = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/api/:levelId/sub-levels",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: subLevelTitle, audio: subLevelAudio }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      const data = await response.json();
      setData(data.newSubLevel);
      console.log(data.newSubLevel);
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmitSublevel}>
        <label>
          Enter a Sublevel title to be created and
          <br />
          <input
            type="text"
            value={subLevelTitle}
            onChange={handleSubLevelTitle}
          />
          <label />
          <br />
          <label>
            a Sublevel Audio title:
            <br />
            <input
              type="text"
              value={subLevelAudio}
              onChange={handleSubLevelAudio}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </label>
        {data && (
          <p>
            New Sublevel created with title:{data.title} and audio: {data.audio}
          </p>
        )}
      </form>
    </>
  );
}
