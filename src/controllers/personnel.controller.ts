import { Request, Response } from 'express';
import * as db from '../services/database.service';
import OracleDB from 'oracledb'

// NOTE: Get user connection 
// 1. Import getPool from database.service.ts (Use username from req.session)
// 2. Get connection from above pool with command getConnection()
// 3. Execute SQL 

export const getAllPersonnel = async (req: Request, res: Response) => {
    try {
        const pool = await db.getOrCreatePool('scott', 'giacat2411');
        const connection = await pool.getConnection();
        const result = await connection.execute(
            'SELECT * FROM PERSONNEL',
            {},
            { outFormat: OracleDB.OUT_FORMAT_OBJECT }
        );
        const data = result.rows;

        await connection.close();

        res.status(200).json({ 'msg': 'Get all personnels successfully', 'personnels': data });
    } catch (err: any) {
        console.log(err.message);
        res.status(500).send({ 'error': 'Error when get personnels' });
    }
}

export const getPersonnelByID = async (req: Request, res: Response) => {
    try {
        const pool = await db.getOrCreatePool('scott', 'giacat2411');
        const connection = await pool.getConnection();
        const result = await connection.execute(
            'SELECT * FROM PERSONNEL WHERE PERSON_ID = :personID',
            { personID: req.params.id },
            { outFormat: OracleDB.OUT_FORMAT_OBJECT }
        );
        const data: Array<unknown> = result.rows ? result.rows : [];

        await connection.close();

        if (data.length === 0) {
            return res.status(404).send({ 'error': 'Personnel not found' });
        }

        res.status(200).json({ 'msg': 'Get personnel by id successfully', 'personnel': data });
    } catch (err: any) {
        console.log(err.message);
        res.status(500).send({ 'error': 'Error when get personnel by id' });
    }
}

export const updatePersonnelByID = async (req: Request, res: Response) => {
    try {
        const pool = await db.getOrCreatePool('scott', 'giacat2411');
        const connection = await pool.getConnection();
        const result = await connection.execute(
            `
                UPDATE PERSONNEL
                SET FIRST_NAME = :firstName,
                    LAST_NAME = :lastName,
                    EMAIL = :email,
                    P_RANK = :rank,
                    SALARY = :salary,
                    TAXCODE = :taxcode,
                WHERE PERSON_ID = :personID
            `,
            {
                firstName: req.body?.firstName,
                lastName: req.body?.lastName,
                email: req.body?.email,
                rank: req.body?.rank,
                salary: req.body?.salary,
                taxcode: req.body?.taxcode,
                personID: req.body?.personID
            },
            { outFormat: OracleDB.OUT_FORMAT_OBJECT }
        );
        const data = result.rows;

        await connection.close();

        res.status(200).json({ 'msg': 'Update personnel by id successfully', 'data': data });
    } catch (err: any) {
        console.log(err.message);
        res.status(500).send({ 'error': 'Error when update personnel by id' });
    }
}