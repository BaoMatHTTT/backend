import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
    const auth = req.headers['Authorization'];
    return req.path;
}

export const logout = async (req: Request, res: Response) => {
    const username = req.session?.username;
    if (username === undefined) {
        res.status(400).json({ 'error': "Haven't authenticated yet" });
    } 
    req.session = null;
}