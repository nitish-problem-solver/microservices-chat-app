import { useEffect } from "react";
import { useChatStore } from "@/store/chatStore";
import { useAuthStore } from "@/store/authStore";

export default function StartDMModal({ onClose }) {
  const { dmUsers, fetchDMUsers, setRoom } = useChatStore();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
  fetchDMUsers(token);
}, [token]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-80 space-y-4">
        <h2 className="font-semibold text-lg">Start Direct Message</h2>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {dmUsers.length > 0 ? (
            dmUsers.map((u) => (
              <div
                key={u._id}
                onClick={() => {
                  setRoom(u.email, true);
                  onClose();
                }}
                className="p-2 rounded cursor-pointer hover:bg-primary/10"
              >
                {u.email}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No users found</p>
          )}
        </div>

        <button
          className="text-sm text-gray-600 w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
