import { create } from "zustand";

export const useChatStore = create((set) => ({
  rooms: [],
  currentRoom: null,
  messages: [],

  setRooms: (rooms) => set({ rooms }),

  setRoom: (roomId) =>
    set({
      currentRoom: roomId,
      messages: [], // clear old messages first
    }),

  setMessages: (messages) =>
    set({
      messages: Array.isArray(messages) ? messages : [],
    }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));
