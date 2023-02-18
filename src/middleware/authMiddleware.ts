import { Request, Response, NextFunction } from "express";
import User from '../mongoDB/Schema/user';

export function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) return next();
    res.status(401).redirect('/login');
}

export function checkNotAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) return res.status(401).redirect('/dashboard');
    next();
}

declare module "express-session" {
    interface SessionData {
        passport: any;
    }
}