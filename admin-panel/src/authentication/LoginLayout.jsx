import { Outlet } from "react-router-dom";

export default function LoginLayout() {
  return (
    <>
      <h1 style={{ color: "black" }}>Layout</h1>
      <Outlet />
    </>
  );
}
