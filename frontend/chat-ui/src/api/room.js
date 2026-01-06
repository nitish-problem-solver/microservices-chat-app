const API = "http://localhost:4002/rooms";

export const fetchRooms = async (token) => {
  const res = await fetch(API, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};


  export const createRoom = async (name, token) => {
  const res = await fetch("http://localhost:4002/rooms", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();


};

export const deleteRoom = async (id, token) => {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const fetchRoomMessages = async (roomId, token) => {
  const res = await fetch(
    `http://localhost:4002/messages/${roomId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.json();
};
