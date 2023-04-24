import { Request, Response } from 'express';
import * as db from '../services/database.service';
import OracleDB from 'oracledb';

// Each session contain following fields:
// 1. username
// 2. user

interface User {
    PERSON_ID: string
}

export const login = async (req: Request, res: Response) => {
    const basic_auth: string = req.headers.authorization ? req.headers.authorization : '';
    const split_string: Array<string> = basic_auth.split(' ');

    if (split_string.length > 2 || split_string.length === 0 || split_string[0] != 'Basic') {
        return res.status(400).json({ 'error': 'Wrong credential format' });
    }

    const credential = Buffer.from(split_string[1], 'base64').toString().split(':');
    if (credential.length !== 2) {
        return res.status(400).json({ 'error': 'Wrong credential format' });
    }

    try {
        const pool = await db.getOrCreatePool(credential[0], credential[1]);
        const connection = await pool.getConnection();
        const data = await connection.execute(
            'SELECT * FROM LOGIN_DATA WHERE USERNAME = :username',
            { username: credential[0] },
            { outFormat: OracleDB.OUT_FORMAT_OBJECT }
        );
        
        await connection.close();
        
        const user = data.rows ? data.rows[0] : {}
        req.session = {
            username: credential[0],
            userID: (user as User)?.PERSON_ID || null
        }

        return res.status(200).json({ 'msg': 'Login successfully' });

    } catch (err: any) {
        console.log(`Error when login with username: ${credential[0]}. Message: ${err.message}`);
        return res.status(400).json({ 'error': 'Wrong credential' });
    }
}

export const getCurrentUserInformation = async (req: Request, res: Response) => {
    try {
        const userID = req.session?.userID;
        const username = req.session?.username;

        const pool = await db.getOrCreatePool(username);
        const connection = await pool.getConnection();
        const result = await connection.execute(
            'SELECT * FROM PERSONNEL WHERE PERSON_ID = :personID',
            { personID: userID },
            { outFormat: OracleDB.OUT_FORMAT_OBJECT }
        );
        const data: Array<unknown> = result.rows ? result.rows : [];
        
        await connection.close();

        if (data.length === 0) {
            return res.status(500).json({ 'error': 'Something went wrong' });
        }

        return res.status(200).json({ 'msg': 'Get Current User Information Successfully', 'information': data });


    } catch (err: any) {
        console.log(`Error get current user information. Message: ${err.message}`);
        return res.status(400).json({ 'error': 'Error get current user information' });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        await db.deletePool(req.session?.username);
        req.session = null;
        return res.status(200).json({ 'msg': 'Logout successfully' });

    } catch (err: any) {
        console.log(`Error when logout user: ${err.message}`);
        return res.status(400).json({ 'error': 'Error when logout user' });
    }
}