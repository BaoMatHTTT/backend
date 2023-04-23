import oracledb from 'oracledb';
import { config } from '../configs';

oracledb.autoCommit = true;

export const initConnection = async () => {
    try {
        const connection = await oracledb.getConnection({
            user: config.db.user,
            password: config.db.password,
            connectionString: config.db.connectionString
        });

        return connection;        
    } catch (err: any) {
        console.log(err.message);
    }
} 
