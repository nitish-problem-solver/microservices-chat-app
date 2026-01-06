import { useChatStore } from "@/store/chatStore";
import { useAuthStore } from "@/store/authStore";

export default function MessageList() {
  const messages = useChatStore((s) => s.messages);
  const currentUserId = useAuthStore((s) => s.userId);
  console.log(currentUserId)

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((m) => {
        // 🔥 NORMALIZE userId
        const messageUserId =
          typeof m.userId === "object"
            ? m.userId.toString()
            : m.userId;

        const isCurrentUser =
          String(messageUserId) === String(currentUserId);
          const isMe = m.userId === currentUserId;
          console.log(isMe,currentUserId,m.userId)



        return (
          <div key={m._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
            <div
              className={`px-4 py-2 rounded-xl max-w-[65%] text-sm ${
                isCurrentUser
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-gray-200 text-black rounded-bl-none"
              }`}
            >
              {m.text}
            </div>
          </div>
        );
      })}
    </div>
  );
}
