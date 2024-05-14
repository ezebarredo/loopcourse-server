import { useState } from "react";
import "/src/App.css";
import SubLevelCreate from "./SubLevelCreate";

let levelId = "";

function LevelCreate({ levelTitle }) {
  return (
    <>
      {data && (
        <span className="info">
          <h3>New Level Title:</h3> <p>"{data}" ✔️</p>
        </span>
      )}
    </>
  );
}

export default function AdminPanel() {
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
      {/* =============Sidebar Start================ */}
      <div className="sidebar">
        <a href="#" className="logo">
          <img src="./img/logo-1.png" alt="" />
          Admin<span>Panel</span>
        </a>
        <ul className="side-menu">
          <li>
            <a href="#">
              <i className="bx bxs-dashboard" />
              Dashboard
            </a>
          </li>
          <li className="active">
            <a href="#">
              <i className="bx bx-video" />
              Create Levels
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-video" />
              Create Sublevels
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-video" />
              Questions
            </a>
          </li>
        </ul>
      </div>
      {/* =============Sidebar Close================ */}
      {/* NAV bar */}
      <div className="content">
        <nav>
          <i className="bx bx-menu" />
          <form onSubmit={handleSubmitLevel}>
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
          </form>
          {/* <a href="#" className="notification">
            <i className="bx bx-bell" />
            <span>12</span>
          </a>
          <a href="#" className="profile">
            <img src="./img/logo-1.png" alt="" />
          </a> */}
        </nav>
        {/* NAV bar close */}
        {/* Main Start */}
        <main>
          <div className="header">
            <h1>Dashboard</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#" className="active">
                  Analytics
                </a>
              </li>
              /
              <li>
                <a href="#">Content</a>
              </li>
            </ul>
          </div>
          {/*============= cards start ===============*/}
          <ul className="cards">
            <li>
              <i className="bx bx-group" />
              {data && (
                <span className="info">
                  <h3>New Level Title:</h3> <p>"{data}" ✔️</p>
                </span>
              )}
            </li>
            {/* <li>
              <i className="bx bx-cart-add" />
              <span className="info">
                <h3>9,373</h3>
                <p>Total Orders</p>
              </span>
            </li>
            <li>
              <i className="bx bx-line-chart" />
              <span className="info">
                <h3>5,373</h3>
                <p>Site Visits</p>
              </span>
            </li>
            <li>
              <i className="bx bx-dollar-circle" />
              <span className="info">
                <h3>$6,373</h3>
                <p>This Month</p>
              </span>
            </li> */}
          </ul>
          {/*============= cards close ===============*/}
          {/*============= bottom Data Start ===============*/}
          <div className="bottom_data">
            <div className="orders">
              <div className="header">
                <h3>Recent Orders</h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>103326</td>
                    <td className="img_content">
                      <img src="./img/1.jpg" alt="" />
                      <p>John Doe</p>
                    </td>
                    <td>admin@onlineittuts.com</td>
                    <td>6th Sep 2025</td>
                    <td>
                      <span className="status completed">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>103626</td>
                    <td className="img_content">
                      <img src="./img/2.jpg" alt="" />
                      <p>Jullee Smith</p>
                    </td>
                    <td>admin@onlineittuts.com</td>
                    <td>6th Sep 2025</td>
                    <td>
                      <span className="status pending">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td>103926</td>
                    <td className="img_content">
                      <img src="./img/3.jpg" alt="" />
                      <p>Willims</p>
                    </td>
                    <td>admin@onlineittuts.com</td>
                    <td>6th Sep 2025</td>
                    <td>
                      <span className="status processing">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td>103326</td>
                    <td className="img_content">
                      <img src="./img/1.jpg" alt="" />
                      <p>John Doe</p>
                    </td>
                    <td>admin@onlineittuts.com</td>
                    <td>6th Sep 2025</td>
                    <td>
                      <span className="status completed">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>103626</td>
                    <td className="img_content">
                      <img src="./img/2.jpg" alt="" />
                      <p>Jullee Smith</p>
                    </td>
                    <td>admin@onlineittuts.com</td>
                    <td>6th Sep 2025</td>
                    <td>
                      <span className="status pending">Pending</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* ============= Reminder Start ===============*/}
            <div className="reminders">
              <div className="header">
                <h3>Reminders</h3>
              </div>
              <ul className="task_list">
                <li className="completed">
                  <div className="task_title">
                    <i className="bx bx-check-circle" />
                    <p>Start Our Meeting</p>
                  </div>
                  <i className="bx bx-dots-vertical-rounded" />
                </li>
                <li className="completed">
                  <div className="task_title">
                    <i className="bx bx-check-circle" />
                    <p>Analysis Our Site</p>
                  </div>
                  <i className="bx bx-dots-vertical-rounded" />
                </li>
                <li className="uncomplete">
                  <div className="task_title">
                    <i className="bx bx-x-circle" />
                    <p>Play Snooker</p>
                  </div>
                  <i className="bx bx-dots-vertical-rounded" />
                </li>
                <li className="completed">
                  <div className="task_title">
                    <i className="bx bx-check-circle" />
                    <p>Start Our Meeting</p>
                  </div>
                  <i className="bx bx-dots-vertical-rounded" />
                </li>
                <li className="uncomplete">
                  <div className="task_title">
                    <i className="bx bx-x-circle" />
                    <p>Play Snooker</p>
                  </div>
                  <i className="bx bx-dots-vertical-rounded" />
                </li>
              </ul>
            </div>
            {/*============= Reminder Close =============== */}
          </div>
          {/*============= bottom Data Start ===============*/}
        </main>
        {/* Main Close */}
      </div>
      {/* =============Contetn CLose================ */}
    </>
  );
}
