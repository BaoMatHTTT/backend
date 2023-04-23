import dotenv from 'dotenv';
import { serverConfig } from "./server.config";
import { dbConfig } from "./db.config";

dotenv.config();
export const config = {
    server: serverConfig,
    db: dbConfig
}