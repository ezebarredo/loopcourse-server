import "/src/App.css";

export default function AdminHome() {
  return (
    <>
      <div className="header">
        <h1>Dashboard</h1>
        <ul className="breadcrumb"></ul>
      </div>
      {/*============= cards start ===============*/}
      <ul className="cards"></ul>
      {/*============= cards close ===============*/}
    </>
  );
}
