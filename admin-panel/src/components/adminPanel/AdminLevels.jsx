import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../shared/Modal";
import "/src/App.css";

//TODO: 1) how breadcrumb are done and how looks like to implement
// on the top of the site. CHECK FIRST VERY WELL DOCUMENTATION!!!

export default function AdminLevels() {
  const getApiLevels = "http://localhost:4000/api/levels";
  const [allLevels, setAllLevels] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const asyncFn = async () => {
      try {
        const response = await fetch(getApiLevels);
        if (!response.ok) {
          throw new Error("Network response failed");
        }
        const data = await response.json();
        setAllLevels(data.getAllLevels);
        // console.log(data.getAllLevels);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    asyncFn();
  }, []);

  // const patchLevel = async () => {
  //   try {
  //     const response = await fetch(getApiLevel, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         title: title,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setLevelName(level.title);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const onEditClick = (id) => {
  //   setIsModalOpen(true);
  //  setLevel(title);
  // };

  // const handleSubmitLevel = (e) => {
  //   e.preventDefault();
  //   patchLevel();
  // };

  // const handleLevelTitleChange = (e) => {
  //   const title = e.target.value;
  //   setLevel((state) => ({
  //     ...state,
  //     title,
  //   }));
  // };

  return (
    <>
      {/* Modal starts */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* <form className="modalForm" onSubmit={handleSubmitLevel}> */}
        <p style={{ color: "black" }}>Edit</p>
        <br />
        <p style={{ color: "black" }}>Level</p>
        {/* <input type="text" value={level} onChange={handleLevelTitleChange} /> */}
        <br />
        <br />
        <br />
        <button type="submit">Submit</button>
        {/* </form> */}
      </Modal>
      {/* Modal Ends */}
      <div className="header">
        <h1>Levels</h1>
      </div>
      {/*============= cards start ===============*/}
      <ul className="cards">
        {allLevels &&
          allLevels.map(({ id, title }) => {
            return (
              <li key={id}>
                <Link to={`/admin/dashboard/levels/${id}`}>
                  <span className="info">
                    <h3 style={{ color: "black" }}>{title}</h3>
                  </span>
                  <br />
                  {/* <button onClick={() => onEditClick(id)}>Edit</button> */}
                </Link>
              </li>
            );
          })}
      </ul>
      {/*============= cards close ===============*/}
    </>
  );
}
