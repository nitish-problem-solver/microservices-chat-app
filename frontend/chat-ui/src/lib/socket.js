import { io } from "socket.io-client";
import { useAuthStore } from "@/store/authStore";

let socket = null;

export const connectSocket = () => {
  const token = useAuthStore.getState().token;
  if (!token) return null;

  if (!socket) {
    socket = io("http://localhost:4002", {
      auth: { token },
    });
  }

  return socket;
};

export const getSocket = () => socket;
