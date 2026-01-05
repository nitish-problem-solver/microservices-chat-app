import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const protoPath = path.resolve(__dirname, "../../../proto/auth.proto");


const packageDef = protoLoader.loadSync(protoPath);
const grpcObj = grpc.loadPackageDefinition(packageDef);
const authPackage = grpcObj.auth;

let client; // 🔥 DO NOT CREATE CLIENT AT IMPORT TIME

export const getAuthClient = () => {
  if (!client) {
    if (!process.env.AUTH_GRPC_URL) {
      throw new Error("AUTH_GRPC_URL is not defined");
    }

    client = new authPackage.AuthService(
      process.env.AUTH_GRPC_URL,
      grpc.credentials.createInsecure()
    );
  }

  return client;
};

export const validateToken = (token) => {
  return new Promise((resolve, reject) => {
    const authClient = getAuthClient(); // ✅ created AFTER dotenv loads

    authClient.ValidateToken({ token }, (err, response) => {
      if (err) return reject(err);
      resolve(response);
    });
  });
};
