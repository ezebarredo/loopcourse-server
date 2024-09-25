import { create } from "zustand";

const store = create((set) => ({
  user: null,
  token: null,
  setUser: (user: "string") => set((state) => ({ user })),
  setToken: (token: "string") => set((state) => ({ token })),
}));

export default store;
