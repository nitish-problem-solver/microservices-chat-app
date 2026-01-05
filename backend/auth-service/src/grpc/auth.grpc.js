import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const protoPath = path.resolve(__dirname, "../../../proto/auth.proto");

const packageDef = protoLoader.loadSync(protoPath);
const grpcObj = grpc.loadPackageDefinition(packageDef);
const authPackage = grpcObj.auth;

function validateToken(call, callback) {
  try {
    const decoded = jwt.verify(call.request.token, process.env.JWT_SECRET);
    callback(null, { valid: true, userId: decoded.id });
  } catch {
    callback(null, { valid: false, userId: "" });
  }
}

const startGrpcServer = () => {
  const server = new grpc.Server();

  server.addService(authPackage.AuthService.service, {
    ValidateToken: validateToken,
  });

  server.bindAsync(
    `0.0.0.0:${process.env.GRPC_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("gRPC Auth Service running");
      server.start();
    }
  );
};

export default startGrpcServer;
