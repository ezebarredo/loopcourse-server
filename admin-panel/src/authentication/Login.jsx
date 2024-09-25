import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import store from "../data/store";
import TOKEN_REQUEST from "../authentication/httpTokenExample";

export default function Login() {
  const [username, setUserName] = useState("test@test.com");
  const [password, setPassword] = useState("12345");
  // const token = store((state) => state.token);
  // const setToken = store((state) => state.setToken);
  // const setUser = store((state) => state.setUser);
  // const navigate = useNavigate();

  TOKEN_REQUEST.API_URL;
  TOKEN_REQUEST.API_URL_POST_USER_LOGIN;

  // const postApiLogin = `http://localhost:4000/api/user/login`;

  // const postLogin = async () => {
  //   try {
  //     const response = await fetch(postApiLogin, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         username: username,
  //         password: password,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //     setToken(data.token);
  //     setUser(username);
  //     // setUserName(username);
  //     // setPassword(password);
  //     navigate("/admin/dashboard");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    TOKEN_REQUEST.httpRequestWithToken();
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
