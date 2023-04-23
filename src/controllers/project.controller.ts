import { Request, Response } from 'express';
import { initConnection } from '../services/database.service';

export const getAllProject = async (req: Request, res: Response) => {
    const connection = await initConnection();
    
    // res.status(200).json({ 'msg': 'Get All Project Successfully' });
}

export const getJoinedProject = async (req: Request, res: Response) => {

}

export const getProjectByID = async (req: Request, res: Response) => {

}

export const updateProjectByID = async (req: Request, res: Response) => {

}

export const getProjectPersonnelByID = async (req: Request, res: Response) => {

}