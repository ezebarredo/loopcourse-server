import { useState } from "react";
import httpRequestWithToken from "./httpTokenExample";

export default function SignUp() {
  const [username, setUserName] = useState("test@test.com");
  const [password, setPassword] = useState("12345");
  const [repassword, setRePassword] = useState("12345");
  const [isSignUpEnabled, setIsSignIpEnabled] = useState(!false);

  const enableSubmitBtn = () => {
    const userNameConfirmation = username;
    const passwordConfirmation = password === repassword;
    setIsSignIpEnabled(userNameConfirmation && passwordConfirmation);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    httpRequestWithToken.publicRequest({
      action: "USER_SIGNUP",
      payload: { username: username, password: password },
    });
  };

  const usernameInput = (e) => {
    setUserName((username) => e.target.value);
  };
  const passwordInput = (e) => {
    setPassword((password) => e.target.value);
  };
  const rePasswordInput = (e) => {
    setRePassword((repassword) => e.target.value);
    enableSubmitBtn();
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
          <h2>Sign Up</h2>
          <br />
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            type="email"
            onInput={usernameInput}
            value={username}
            placeholder="Enter email"
            required
          />
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            onInput={passwordInput}
            value={password}
            placeholder="Create Password"
            required
          />
          <label htmlFor="confirm-password">
            <b>Re-enter Password</b>
          </label>
          <input
            type="password"
            value={repassword}
            onInput={rePasswordInput}
            placeholder="Confirm Password"
            required
          />
          <br />
          <br />
          <button
            disabled={!isSignUpEnabled}
            style={{ background: "black" }}
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}
