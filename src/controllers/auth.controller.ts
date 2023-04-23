import { Request, Response } from 'express';

// Each session contain 2 fields
// 1. username
// 2. timeoutID: ID of setTimeOut callback. When use logout, clear this callback
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