import { useState } from "react";
import httpRequestWithToken from "./httpTokenExample";

export default function Login() {
  const [username, setUserName] = useState("test@test.com");
  const [password, setPassword] = useState("12345");

  const handleSubmit = (e) => {
    e.preventDefault();
    httpRequestWithToken.publicRequest({
      action: "USER_LOGIN",
      payload: { username: username, password: password },
    });
  };

  const usernameInput = (e) => {
    setUserName((username) => e.target.value);
  };
  const passwordInput = (e) => {
    setPassword((password) => e.target.value);
  };

  return (
    <>
      <form
        className="container-auth"
        action=""
        method="post"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h2>Login</h2>
          <br />
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="email"
            onInput={usernameInput}
            value={username}
            placeholder="Enter email"
            name="email"
            required
          />
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            onInput={passwordInput}
            value={password}
            placeholder="Enter Password"
            required
          />
          <br />
          <br />
          <button style={{ background: "black" }} type="submit">
            Login
          </button>
          <br />
          <br />
          <a href="#">Forgot password?</a>
        </div>
      </form>
    </>
  );
}
