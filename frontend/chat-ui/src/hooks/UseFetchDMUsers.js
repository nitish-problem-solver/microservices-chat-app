import { useEffect } from "react";
import { useChatStore } from "@/store/chatStore";
import { useAuthStore } from "@/store/authStore";

export default function useFetchDMUsers() {
  const token = useAuthStore((s) => s.token);
  const setDMUsers = useChatStore((s) => s.setDMUsers);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:4001/auth/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setDMUsers)
      .catch(console.error);
  }, [token]);
}
