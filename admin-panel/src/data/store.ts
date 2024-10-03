import { create } from "zustand";

type User = {
  name: string;
  password: string;
};

const store = create((set) => ({
  user: null,
  token: null,
  setUser: (user: User) => set((_state) => ({ user })),
  setToken: (token: string) => {
    set((_state) => ({ token }));
    // localStorage.setItem("authToken", token);
  },
  clearToken: (token: null) => {
    set((_state) => ({ token }));
    // localStorage.removeItem("authToken");
  },
}));

export default store;
