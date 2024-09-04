export default function SignUp() {
  return (
    <>
      <form className="container-auth" action="" method="post">
        <div>
          <h2>Sign Up</h2>
          <br />
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter email"
            name="username"
            required
          />
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="text"
            placeholder="Create Password"
            name="password"
            required
          />
          <label htmlFor="confirm-password">
            <b>Re-enter Password</b>
          </label>
          <input
            type="text"
            placeholder="Confirm Password"
            name="confirm-password"
            required
          />
          <br />
          <br />
          <button style={{ background: "black" }} type="submit">
            Sign up
          </button>
        </div>
      </form>
    </>
  );
}
