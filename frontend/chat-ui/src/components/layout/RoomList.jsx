import { FiPlus, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import InviteUsersModal from "@/components/modals/InviteUsersModal";
import { useChatStore } from "@/store/chatStore";

export default function RoomsList() {
  const { rooms, setRoom } = useChatStore();
  const [inviteRoom, setInviteRoom] = useState(null);

  return (
    <div className="px-4 space-y-2">
      {rooms.map((room) => (
        <div
          key={room.name}
          className="border rounded-lg p-2 bg-gray-50"
        >
          {/* Room header */}
          <div className="flex justify-between items-center">
            <span
              className="font-medium cursor-pointer"
              onClick={() => setRoom(room.name, false)}
            >
              #{room.name}
            </span>

            <div className="flex gap-2">
              <FiPlus
                className="cursor-pointer"
                title="Invite users"
                onClick={() => setInviteRoom(room.name)}
              />
              <FiTrash2
                className="cursor-pointer text-red-500"
                title="Delete room"
              />
            </div>
          </div>

          {/* Members */}
          <div className="mt-2 text-xs text-gray-600">
            Members:
            <div className="flex flex-wrap gap-2 mt-1">
              {room.members.length > 0 ? (
                room.members.map((u) => (
                  <span
                    key={u}
                    className="px-2 py-1 bg-primary/10 rounded"
                  >
                    {u}
                  </span>
                ))
              ) : (
                <span>No members</span>
              )}
            </div>
          </div>
        </div>
      ))}

      {inviteRoom && (
        <InviteUsersModal
          type="room"
          target={inviteRoom}
          onClose={() => setInviteRoom(null)}
        />
      )}
    </div>
  );
}
