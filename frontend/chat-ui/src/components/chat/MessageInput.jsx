import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { getSocket } from "@/lib/socket";
import { useChatStore } from "@/store/chatStore";
import { useAuthStore } from "@/store/authStore";

export default function MessageInput() {
  const [text, setText] = useState("");
  const { currentRoom, addMessage } = useChatStore();
  const userId = useAuthStore((s) => s.userId);

const send = () => {
  if (!text.trim() || !currentRoom) return;

  const socket = getSocket();
  if (!socket) return;

  socket.emit("sendRoomMessage", {
    roomId: currentRoom,
    text,
  });

  setText("");
};


  return (
    <div className="flex items-center gap-3">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        className="flex-1 border rounded-xl px-4 py-2"
        placeholder="Type a message..."
      />
      <button
        onClick={send}
        className="p-2 rounded-full bg-primary text-white"
      >
        <IoMdSend size={20} />
      </button>
    </div>
  );
}
