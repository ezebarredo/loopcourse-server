import store from "../data/store";
// import { useNavigate } from "react-router-dom";

// MINI LOGIN
////////////////////////////////////////////////////////////////
// const API_URL = process.env.API_URL || `http://localhost:4000`;
const API_URL = `http://localhost:4000`;
const API_URL_POST_USER_LOGIN = `${API_URL}/api/user/login`;

const httpRequestWithToken = async ({ action, payload }) => {
  try {
    const token = store.getState().token;
    // const navigate = useNavigate();
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
      case "USER_LOGIN":
        response = await fetch(API_URL_POST_USER_LOGIN, {
          method: "POST",
          headers: privateRouteHeaders,
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();
        console.log(data);

        alert("Logged in successfully.");

      // return navigate("/admin/dashboard");
    }
  } catch (error) {
    console.log(error);
  }
};

// EXAMPLE USAGE
httpRequestWithToken({
  action: "USER_LOGIN",
  payload: { email: "test@test.com", password: "12345" },
});

const HttpTokenExampleMini = {
  API_URL,
  API_URL_POST_USER_LOGIN,
  httpRequestWithToken,
};

export default HttpTokenExampleMini;
