import { useState } from "react";
import "/src/App.css";
import { Link } from "react-router-dom";

export default function AdminPanel() {
  const getApiLevels = "http://localhost:4000/api/levels";
  const [allLevels, setAllLevels] = useState(null);

  // const handleLevelTitle = (event) => {
  //   setlevelTitle((levelTitle) => event.target.value);
  // };

  const handleGetLevels = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(getApiLevels);
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      const data = await response.json();
      setAllLevels(data.getAllLevels);

      // console.log("Response from backend:", data.getAllLevels);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {/* =============Sidebar Start================ */}
      <div className="sidebar">
        <a href="#" className="logo">
          <img src="./img/logo-1.png" alt="" />
          <Link to={"/admin/dashboard"}>
            {" "}
            Admin<span>Panel</span>
          </Link>
        </a>
        <ul className="side-menu">
          <li>
            <a href="#">
              <i className="bx bxs-dashboard" />
              Dashboard
            </a>
          </li>
          <li className="active">
            <a style={{ cursor: "pointer" }} onClick={handleGetLevels}>
              <i className="bx bx-video" />
              GET Levels
            </a>
          </li>
          {/* <li>
            <a>
              <i className="bx bx-video" />
              Create Sublevels
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-video" />
              Questions
            </a>
          </li> */}
        </ul>
      </div>
      {/* =============Sidebar Close================ */}
      {/* NAV bar */}
      <div className="content">
        <nav>
          <i className="bx bx-menu" />
          {/* <form onSubmit={handleGetLevels}>
            <div className="form-input">
              <input
                type="text"
                value={levelTitle}
                onChange={handleLevelTitle}
                placeholder="Enter a level title to be created...."
              />
              <button type="submit">
                Submit
                <i className="bx bx-search" />
              </button>
            </div>
          </form> */}
        </nav>
        {/* NAV bar close */}
        {/* Main Start */}
        <main>
          <div className="header">
            <h1>Dashboard</h1>
            <ul className="breadcrumb">
              {/* <li>
                <a href="#" className="active">
                  Analytics
                </a>
              </li>
              /
              <li>
                <a href="#">Content</a>
              </li> */}
            </ul>
          </div>
          {/*============= cards start ===============*/}
          <ul className="cards">
            {allLevels &&
              allLevels.map((level) => {
                return (
                  <li key={level.id}>
                    <i className="bx bx-group" />
                    <span className="info">
                      <h4 style={{ color: "black" }}>
                        id: {level.id}
                        <br />
                        Title: {level.title}
                      </h4>{" "}
                      : ""
                    </span>
                  </li>
                );
              })}
          </ul>
          {/*============= cards close ===============*/}

          {/*============= bottom Data Start ===============*/}
        </main>
        {/* Main Close */}
      </div>
      {/* =============Content CLose================ */}
    </>
  );
}
