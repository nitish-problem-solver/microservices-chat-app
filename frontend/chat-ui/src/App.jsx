import { useEffect } from "react";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { useAuthStore } from "@/store/authStore";

function App() {
  const { token, loadFromStorage } = useAuthStore();

  // 🔁 Auto-login on refresh
  useEffect(() => {
    loadFromStorage();
  }, []);

  return token ? <Chat /> : <Login />;
}

export default App;
