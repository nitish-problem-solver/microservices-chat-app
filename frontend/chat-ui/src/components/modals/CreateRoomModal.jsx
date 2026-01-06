import { useState } from "react";

import { useChatStore } from "@/store/chatStore";
import { useAuthStore } from "@/store/authStore";
import { createRoom } from "@/api/room";

export default function CreateRoomModal({ onClose }) {
  const [name, setName] = useState("");
  const token = useAuthStore((s) => s.token);
  const { rooms, setRooms } = useChatStore();

  const submit = async () => {
    if (!name.trim()) return;
    console.log(name,token)
    const room = await createRoom(name, token);
    setRooms([...rooms, room]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-80 space-y-4">
        <h2 className="font-semibold text-lg">Create Room</h2>

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Room name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={submit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
