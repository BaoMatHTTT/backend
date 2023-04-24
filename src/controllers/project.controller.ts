import { Request, Response } from 'express';
import * as db from '../services/database.service';
import OracleDB from 'oracledb';

// NOTE: Get user connection 
// 1. Import getPool from database.service.ts (Use username from req.session)
// 2. Get connection from above pool with command getConnection()
// 3. Execute SQL 

export const getAllProject = async (req: Request, res: Response) => {
    try {
        const pool = await db.getOrCreatePool(req.session?.username);
        const connection = await pool.getConnection();
        const result = await connection.execute(
            'SELECT * FROM P_PROJECT NATURAL JOIN PROJECT_BUDGET',
            {},
            { outFormat: OracleDB.OUT_FORMAT_OBJECT }
        );
        const data = result.rows;

        await connection.close();

        res.status(200).json({ 'msg': 'Get all project successfully', 'projects': data });
    } catch (err: any) {
        console.log(err.message);
        res.status(500).send({ 'error': 'Error when get all projects' });
    }
}

export const createProject = async (req: Request, res: Response) => {
    try {
        const pool = await db.getOrCreatePool(req.session?.username);
        const connection = await pool.getConnection();
        const result = await connection.execute(
            `
                INSERT INTO P_PROJECT(PROJECT_ID, MANAGER_ID, P_NAME, START_DATE, EXPECTED_END_DATE, ACTUAL_END_DATE, P_DESCRIPTION)
                VALUES (:projectID, :managerID, :name, :startDate, :expectedEndDate, :actualEndDate, :description)
            `,
            {
                projectID: req.body?.projectID,
                managerID: req.body?.managerID,
                name: req.body?.name,
                startDate: req.body?.startDate,
                expectedEndDate: req.body?.expectedEndDate,
                actualEndDate: req.body?.actualEndDate,
                description: req.body?.description
            },
            { outFormat: OracleDB.OUT_FORMAT_OBJECT }
        );
        const data = result.rows;

        await connection.close();

        res.status(200).json({ 'msg': 'Create project successfully', 'data': data });
    } catch (err: any) {
        console.log(err.message);
        res.status(500).send({ 'error': 'Error when create project' });
    }
}

export const getProjectByID = async (req: Request, res: Response) => {
    try {
        const pool = await db.getOrCreatePool(req.session?.username);
        const connection = await pool.getConnection();
        const result = await connection.execute(
            'SELECT * FROM P_PROJECT NATURAL JOIN PROJECT_BUDGET WHERE PROJECT_ID = :projectID',
            { projectID: req.params.id },
            { outFormat: OracleDB.OUT_FORMAT_OBJECT }
        );
        const data: Array<unknown> = result.rows ? result.rows : [];

        await connection.close();

        if (data.length === 0) {
            return res.status(404).send({ 'error': 'Project not found' });
        }

        res.status(200).json({ 'msg': 'Get project by id successfully', 'project': data });
    } catch (err: any) {
        console.log(err.message);
        res.status(500).send({ 'error': 'Error when get project by id' });
    }
}

export const updateProjectByID = async (req: Request, res: Response) => {
    try {
        const pool = await db.getOrCreatePool(req.session?.username);
        const connection = await pool.getConnection();
        const result = await connection.execute(
            `
                UPDATE P_PROJECT
                SET MANAGER_ID = :managerID,
                    P_NAME = :name,
                    START_DATE = :startDate,
                    EXPECTED_END_DATE = :expectedEndDate,
                    ACTUAL_END_DATE = :actualEndDate,
                    P_DESCRIPTION = :description
                WHERE PROJECT_ID = :projectID
            `,
            {
                projectID: req.body?.projectID,
                managerID: req.body?.managerID,
                name: req.body?.name,
                startDate: req.body?.startDate,
                expectedEndDate: req.body?.expectedEndDate,
                actualEndDate: req.body?.actualEndDate,
                description: req.body?.description
            },
            { outFormat: OracleDB.OUT_FORMAT_OBJECT }
        );
        const data = result.rows;

        await connection.close();

        res.status(200).json({ 'msg': 'Update project by id successfully', 'data': data });
    } catch (err: any) {
        console.log(err.message);
        res.status(500).send({ 'error': 'Error when update project by id' });
    }
}

export const deleteProjectByID = async (req: Request, res: Response) => {
    try {
        const pool = await db.getOrCreatePool(req.session?.username);
        const connection = await pool.getConnection();
        const result = await connection.execute(
            'DELETE FROM P_PROJECT WHERE PROJECT_ID = :projectID',
            { projectID: req.params.id },
            { outFormat: OracleDB.OUT_FORMAT_OBJECT }
        );
        const data = result.rows;

        await connection.close();

        res.status(200).json({ 'msg': 'Delete project by id successfully', 'data': data });
    } catch (err: any) {
        console.log(err.message);
        res.status(500).send({ 'error': 'Error when delete project by id' });
    }
}

export const getProjectPersonnelByID = async (req: Request, res: Response) => {
    try {
        const pool = await db.getOrCreatePool(req.session?.username);
        const connection = await pool.getConnection();
        const result = await connection.execute(
            `   
                SELECT * 
                FROM PROJECT_MEMBER JOIN PERSONNEL ON STAFF_ID = PERSON_ID
                WHERE PROJECT_ID = :projectID
            `,
            { projectID: req.params.id },
            { outFormat: OracleDB.OUT_FORMAT_OBJECT }
        );
        const data = result.rows;

        await connection.close();

        res.status(200).json({ 'msg': 'Get project personnels by id successfully', 'personnels': data });
    } catch (err: any) {
        console.log(err.message);
        res.status(500).send({ 'error': 'Error when get project personnels by id' });
    }
}

export const addProjectPersonnelByID = async (req: Request, res: Response) => {
    try {
        const pool = await db.getOrCreatePool(req.session?.username);
        const connection = await pool.getConnection();
        const result = await connection.execute(
            `
                INSERT INTO PROJECT_MEMBER(PROJECT_ID, STAFF_ID, START_DATE, END_DATE)
                VALUES (:projectID, :staffID, :startDate, :endDate)
            `,
            {
                projectID: req.body?.projectID,
                staffID: req.body?.staffID,
                startDate: req.body?.startDate,
                endDate: req.body?.endDate,
            },
            { outFormat: OracleDB.OUT_FORMAT_OBJECT }
        );
        const data = result.rows;

        await connection.close();

        res.status(200).json({ 'msg': 'Add project personnels successfully', 'add': data });
    } catch (err: any) {
        console.log(err.message);
        res.status(500).send({ 'error': 'Error when add project personnels' });
    }
}