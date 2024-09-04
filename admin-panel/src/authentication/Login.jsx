export default function Login() {
  return (
    <>
      <form className="container-auth" action="" method="post">
        <div>
          <h2>Login</h2>
          <br />
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input type="text" placeholder="Enter email" name="email" required />
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="text"
            placeholder="Enter Password"
            name="password"
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
