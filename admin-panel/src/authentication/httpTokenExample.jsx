import store from "../data/store";
// import { useNavigate } from "react-router-dom";

// TODO: SignUp/Login/navigate
////////////////////////////////////////////////////////////////
// const API_URL = process.env.API_URL || `http://localhost:4000`;
const API_URL = `http://localhost:4000`;
// API: PRIVATE ROUTES
const API_URL_POST_USER_SIGNUP = `${API_URL}/api/user/signup`;
const API_URL_POST_USER_LOGIN = `${API_URL}/api/user/login`;
const API_URL_POST_USER_LOGOUT = `${API_URL}/api/user/logout`;
const API_URL_GET_USER_ITEMS = `${API_URL}/api/user/items`;
// API: PUBLIC ROUTES
const API_URL_GET_ITEMS = `${API_URL}/api/items`;
// const navigate = useNavigate();

const publicRequest = async ({ action, payload }) => {
  try {
    const { token, setToken, user, setUser } = store.getState();
    const publicRouteHeaders = {
      "Content-Type": "application/json",
    };
    let response;
    let data;
    switch (action) {
      case "USER_LOGIN":
        response = await fetch(API_URL_POST_USER_LOGIN, {
          method: "POST",
          headers: publicRouteHeaders,
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();
        setToken(data.token);
        setUser(data.user);

        console.log("Logged in successfully :)");
        // return navigate("/admin/dashboard");
        break;
      case "USER_SIGNUP":
        response = await fetch(API_URL_POST_USER_SIGNUP, {
          method: "POST",
          headers: publicRouteHeaders,
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();
        console.log("User created. You can now log in!");
        break;
      case "ITEMS":
        response = await fetch(API_URL_GET_ITEMS, {
          method: "GET",
          headers: publicRouteHeaders,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

const privateRequest = async ({ action, payload }) => {
  try {
    const { token, setToken, setUser } = store.getState();
    const privateRouteHeaders = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };
    let response;
    let data;

    switch (action) {
      // *************************************
      // PRIVATE ROUTES (REQUESTS)
      // *************************************
      case "USER_LOGOUT":
        response = await fetch(API_URL_POST_USER_LOGOUT, {
          method: "POST",
          headers: privateRouteHeaders,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setNotification("Logged out successfully.");
        setToken(null);

      //   return navigate("/");

      case "USER_ITEMS":
        response = await fetch(API_URL_GET_USER_ITEMS, {
          method: "GET",
          headers: privateRouteHeaders,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();

      //   return setUserItems(data);
    }
  } catch (error) {
    console.log(error);
  }
};

// EXAMPLE USAGE
// httpRequestWithToken({
//   action: "USER_SIGNUP",
//   payload: { email: "hello@world.com", password: "hello world" },
// });

// httpRequestWithToken({
//   action: "USER_LOGIN",
//   payload: { email: "hello@world.com", password: "hello world" },
// });

// httpRequestWithToken({
//   action: "USER_LOGOUT",
//   payload: {},
// });

const HttpTokenExample = {
  publicRequest,
  privateRequest,
};

export default HttpTokenExample;

// case 'USER_SIGNUP'
// case 'USER_LOGIN'
// case 'USER_LOGOUT'

// const store = {
//   user: null,
//   token: null,
//   setUser: (user) => set((state) => ({ user })),
//   setToken: (token) => set((state) => ({ token })),
//   logUserOut: () => set((state) => ({ user: null })),
// };

// 3-TIER APPLICATION
// ********************
// STATE/DATA/MODEL
// UPDATE/BUSINESS-LOGIC
// VIEW/UI/PRESENTATION
