import { useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { getSocket } from "@/lib/socket";

export default function AddMemberModal({ roomId, onClose }) {
  const { dmUsers, addMemberToRoom } = useChatStore();
  const [selected, setSelected] = useState([]);
  const socket = getSocket();

  const toggle = (user) => {
    setSelected((prev) =>
      prev.find((u) => u._id === user._id)
        ? prev.filter((u) => u._id !== user._id)
        : [...prev, user]
    );
  };

  const invite = () => {
    selected.forEach((user) => {
      socket.emit("addMemberToRoom", {
        roomId,
        userId: user._id,
      });

      addMemberToRoom(roomId, user);
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4">
        <h2 className="font-semibold text-lg">
          Invite users to #{roomId}
        </h2>

        <div className="max-h-60 overflow-y-auto space-y-2">
          {dmUsers.map((u) => (
            <label
              key={u._id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={!!selected.find((s) => s._id === u._id)}
                onChange={() => toggle(u)}
              />
              <span>{u.email}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={invite}
          >
            Invite
          </button>
        </div>
      </div>
    </div>
  );
}
