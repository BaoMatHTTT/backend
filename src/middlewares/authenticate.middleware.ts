import { Request, Response, NextFunction } from 'express'
import * as db from '../services/database.service';

export const authenticated = async (req: Request, res: Response, next: NextFunction) => {
    const nonSecurePath = ['/api/v1/login'];
    if (nonSecurePath.includes(req.path) || req.session?.username) {
        if (req.session?.username) {
            try {
                await db.getOrCreatePool(req.session?.username);
                return next();
            } catch (err) {
                console.log('Have session but no pool for username: ' + req.session?.username)
                req.session = null;
                return res.status(500).json({ 'error': 'Something went wrong' });
            }
        } else {
            return next();
        }
    } else {
        res.status(401).json({ 'error': "Haven't authenticated yet" });
    } 
}