import { useEffect } from "react";
import { connectSocket } from "@/lib/socket";
import { useAuthStore } from "@/store/authStore";
import Sidebar from "@/components/layout/Sidebar";
import ChatContainer from "@/components/layout/ChatContainer";

export default function Chat() {
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (token) {
      connectSocket(); // 🔥 THIS WAS MISSING
    }
  }, [token]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatContainer />
    </div>
  );
}
