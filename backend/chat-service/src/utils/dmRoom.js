export const getDMRoomId = (userA, userB) => {
  return `dm:${[userA, userB].sort().join("_")}`;
};
