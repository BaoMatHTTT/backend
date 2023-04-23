import dotenv from 'dotenv';
dotenv.config();

import { serverConfig } from "./server.config";
import { dbConfig } from "./db.config";

export const config = {
    server: serverConfig,
    db: dbConfig
}