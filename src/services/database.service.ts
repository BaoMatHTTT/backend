import oracledb from 'oracledb';
import { config } from '../configs';

oracledb.autoCommit = true;

export const createPool = async (username: string, password: string) => {
    try {
        await oracledb.createPool({
            user: username,
            password: password,
            connectionString: config.db.connectionString,
            poolAlias: username,
            poolMin: 1,
            poolMax: 1,
        })
        console.log(`Create pool with user ${username} successfully`);
    } catch (error: any) {
        console.log(`Error when create pool with user ${username}: ${error.message}`);
    }
}

export const getPool = async (username: string) => {
    try {
        const pool = await oracledb.getPool(username);
        console.log(`Get pool with user ${username} successfully`);
        return pool;

    } catch (error: any) {
        console.log(`Error when get pool with user ${username}: ${error.message}`);
    }
}

export const deletePool = async (username: string) => {
    try {
        const pool = await oracledb.getPool(username)
        pool.close(0);
        console.log(`Delete pool with user ${username} successfully`)

    } catch (error: any) {
        console.log(`Error when delete pool with user ${username}: ${error.message}`);
    }
}
