import { useState } from "react";

export default function SignUp() {
  const [username, setUserName] = useState("test@test.com");
  const [password, setPassword] = useState("12345");
  const [repassword, setRePassword] = useState("12345");
  const [isSignUpEnabled, setIsSignIpEnabled] = useState(!false);

  const postApiSignUp = `http://localhost:4000/api/user/signup`;

  const postSignUp = async () => {
    try {
      const response = await fetch(postApiSignUp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setUserName(username);
      setPassword(password);
    } catch (error) {
      console.log(error);
    }
  };

  const enableSubmitBtn = () => {
    const userNameConfirmation = username;
    const passwordConfirmation = password === repassword;
    setIsSignIpEnabled(userNameConfirmation && passwordConfirmation);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postSignUp();
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
