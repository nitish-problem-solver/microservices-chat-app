import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },   // sender
    roomId: { type: String, required: true },   // room or dm room
    text: { type: String, required: true },
    type: {
      type: String,
      enum: ["room", "dm"],
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
