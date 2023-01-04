import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

export const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "./key/private.key")
);

export const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, "./key/public.key")
);

export default process.env;
