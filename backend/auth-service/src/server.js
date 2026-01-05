import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import startGrpcServer from "./grpc/auth.grpc.js";

await connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Auth HTTP server running on port ${process.env.PORT}`);
});

startGrpcServer();
