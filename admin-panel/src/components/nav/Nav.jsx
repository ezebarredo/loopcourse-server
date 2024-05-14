import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <div
        style={{
          padding: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
      </div>
    </>
  );
}
