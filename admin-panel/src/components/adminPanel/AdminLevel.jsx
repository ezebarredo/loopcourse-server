import "/src/App.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminLevel() {
  let { levelId } = useParams();
  const [level, setLevel] = useState(null);
  const [levelName, setLevelName] = useState(null);

  const getApiLevel = `http://localhost:4000/api/levels/${levelId}`;

  // run call function, when (dependency)
  useEffect(() => {
    const asyncFn = async () => {
      try {
        const response = await fetch(getApiLevel);
        if (!response.ok) {
          throw new Error("Network response failed");
        }

        const data = await response.json();
        setLevel(data.getLevel);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    asyncFn();
  }, [levelId]);

  const patchLevel = async () => {
    try {
      const response = await fetch(getApiLevel, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: level.title,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLevelName(level.title);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // useEffect(() => {
  //   const asyncFn = async () => {
  //     try {
  //       const response = await fetch(getApiLevel, {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           title: level.title,
  //         }),
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   asyncFn();
  // }, [level]);

  const handleSubmit = (e) => {
    e.preventDefault();
    patchLevel();
    console.log(`The name you entered was: ${level.title}`);
  };

  const handleLevelTitleChange = (e) => {
    const title = e.target.value;
    setLevel((state) => ({
      ...state,
      // title: state.title,
      title,
    }));
  };

  return (
    <>
      <p style={{ color: "black" }}>Enter a new Level name </p>
      {level && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={level.title}
            onChange={handleLevelTitleChange}
          />
          <input type="submit" />
        </form>
      )}
      <h4 style={{ color: "black" }}>
        {levelName && `New Level Name: ${levelName} ✔️`}
      </h4>

      {/*============= cards start ===============*/}
      <ul className="cards">
        {level &&
          level.subLevels.map(({ id, title, audio }) => {
            return (
              <li key={id}>
                <i className="bx bx-group" />
                <span className="info">
                  <h4 style={{ color: "black" }}>
                    id: {id}
                    <br />
                    {level.title}
                    <br />
                    {title}
                    <br />
                    {audio}
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
