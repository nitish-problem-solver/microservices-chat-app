import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  userId: null,

  login: ({ token, userId }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    set({ token, userId });
  },

  logout: () => {
    localStorage.clear();
    set({ token: null, userId: null });
  },

  loadFromStorage: () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) set({ token, userId });
  },
}));
