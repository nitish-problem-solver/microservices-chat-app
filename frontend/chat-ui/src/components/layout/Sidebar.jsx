import { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiLogOut } from "react-icons/fi";
import { useChatStore } from "@/store/chatStore";
import { useAuthStore } from "@/store/authStore";

import CreateRoomModal from "@/components/modals/CreateRoomModal";
import SidebarHeader from "./SideHeader";
import useFetchDMUsers from "@/hooks/UseFetchDMUsers";
import { deleteRoom, fetchRoomMessages, fetchRooms } from "@/api/room";
import { getSocket } from "@/lib/socket";

export default function Sidebar() {
  useFetchDMUsers();

  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);

  const {
    rooms,
    setRooms,
    removeRoom,
    currentRoom,
    setRoom,
    dmUsers,
    setMessages 
  } = useChatStore();


const socket = getSocket();
// const [messages,setMessages]=useState([])

const handleRoomClick = async (roomId) => {
  if (!socket) return;

  socket.emit("joinRoom", roomId); // ✅ join socket room
  setRoom(roomId);                 // clear old messages

  const msgs = await fetchRoomMessages(roomId, token);
  setMessages(msgs);               // ✅ load history
};

  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    console.log(dmUsers)
    if (token) fetchRooms(token).then(setRooms);
  }, [token]);

  const handleDelete = async (id) => {
    await deleteRoom(id, token);
    removeRoom(id);
  };

  return (
    <div className="w-72 bg-white border-r flex flex-col">
      {/* ROOMS */}
      <div className="flex justify-between items-center px-4 py-2">
        <SidebarHeader title="Rooms" />
        <FiPlus
          className="cursor-pointer"
          onClick={() => setShowCreate(true)}
        />
      </div>

      <div className="px-4 space-y-1">
        {rooms?.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room._id}
              className={`flex justify-between items-center p-2 rounded transition-colors ${
                currentRoom === room._id
                  ? "bg-primary/20"
                  : "hover:bg-primary/10"
              }`}
            >
              <span
                 onClick={() => handleRoomClick(room._id)}
                className="cursor-pointer w-full"
              >
                #{room.name}
              </span>

              <FiTrash2
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(room._id)}
              />
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400 px-2">
            No rooms available
          </p>
        )}
      </div>

      {/* DIRECT MESSAGES */}
      <SidebarHeader title="Direct Messages" />

      <div className="px-4 flex-1 overflow-y-auto space-y-1">
        {dmUsers?.map((u) => (
          <div
            key={u._id}
            className={`p-2 rounded cursor-pointer transition-colors ${
              currentRoom === u._id
                ? "bg-primary/20"
                : "hover:bg-primary/10"
            }`}
            onClick={() => setRoom(u._id, true)}
          >
            {u.email.split("@")[0]}
          </div>
        ))}
      </div>

      {/* LOGOUT */}
      <div className="border-t p-4">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 text-red-600 cursor-pointer"
        >
          <FiLogOut /> Logout
        </button>
      </div>

      {showCreate && (
        <CreateRoomModal onClose={() => setShowCreate(false)} />
      )}
    </div>
  );
}
