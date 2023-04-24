import oracledb, { Pool } from 'oracledb';
import { config } from '../configs';

oracledb.autoCommit = true;

export const getOrCreatePool = async (username: string, password: string = "") => {
    var pool: Pool;
    try {
        pool = await oracledb.getPool(username);
        return pool;
    }
    catch (error: any) {
        console.log(`Error when get pool with username: ${username}. Message: ${error.message}`);
        try {
            if (!password) {
                throw Error('No password')
            };
                        pool = await oracledb.createPool({
                user: username,
                password: password,
                connectionString: config.db.connectionString,
                poolAlias: username,
                poolMin: 1,
                poolMax: 2,
            });
            return pool;    
        } catch (error: any) {
            console.log(`Error when create pool with user ${username}: ${error.message}`);
            throw error;
        }
    } 
}

export const deletePool = async (username: string) => {
    try {
        const pool = await oracledb.getPool(username);
        await pool.close(0);

    } catch (error: any) {
        console.log(`Error when delete pool with user ${username}: ${error.message}`);
        throw error;
    }
}
