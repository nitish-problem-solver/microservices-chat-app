import { useEffect } from "react";
import { getSocket } from "@/lib/socket";
import { useChatStore } from "@/store/chatStore";

export default function MessageListener() {
  const addMessage = useChatStore((s) => s.addMessage);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewRoomMessage = (message) => {
      addMessage(message);
    };

    socket.on("newRoomMessage", handleNewRoomMessage);

    return () => {
      socket.off("newRoomMessage", handleNewRoomMessage);
    };
  }, [addMessage]);

  return null; // 👈 important: this renders nothing
}
