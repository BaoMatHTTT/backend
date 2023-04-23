import { Request, Response, NextFunction } from 'express'

export const authenticated = async (req: Request, res: Response, next: NextFunction) => {
    const nonSecurePath = ['/login']
    if (nonSecurePath.includes(req.path) || req.session?.username) {
        return next();
    } else {
        res.status(401).json({ 'error': "Haven't authenticated yet" });
    } 
}