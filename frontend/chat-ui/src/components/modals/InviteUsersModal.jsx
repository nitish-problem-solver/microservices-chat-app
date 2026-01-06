import { useState } from "react";
import { getSocket } from "@/lib/socket";
import { useChatStore } from "@/store/chatStore";

export default function InviteUsersModal({ type, target, onClose }) {
  const { dmUsers } = useChatStore();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const socket = getSocket();

  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((u) => u !== id)
        : [...prev, id]
    );
  };

  const invite = () => {
    selectedUsers.forEach((userId) => {
      socket.emit(
        type === "room" ? "addMemberToRoom" : "inviteToDM",
        { roomId: target, userId }
      );
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4">
        <h2 className="font-semibold text-lg">
          Invite Users
        </h2>

        <div className="max-h-60 overflow-y-auto space-y-2">
          {dmUsers.map((u) => (
            <label
              key={u._id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedUsers.includes(u._id)}
                onChange={() => toggleUser(u._id)}
              />
              <span>{u.email}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={invite}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Invite
          </button>
        </div>
      </div>
    </div>
  );
}
