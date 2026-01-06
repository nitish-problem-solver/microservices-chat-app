import ChatHeader from "./ChatHeader";
import MessageList from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";
import { useChatStore } from "@/store/chatStore";
import MessageListener from "../chat/MessageListner";

export default function ChatContainer() {
  const { currentRoom, isDM } = useChatStore();

  const title = isDM
    ? `Chat with ${currentRoom}`
    : `Room: ${currentRoom}`;

  return (
    <div className="flex-1 flex flex-col bg-chatBg">
      <ChatHeader title={title} />
      <MessageListener/>
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <MessageList />
      </div>
      <div className="px-6 py-4 border-t bg-white">
        <MessageInput />
      </div>
    </div>
  );
}
