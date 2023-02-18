import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

let options = {
    methods: ["get"],
    endpoint: "/auth/github/callback",
    middleware: passport.authenticate('github', { failureRedirect: '/login' }),
    callbackGET: (req: Request, res: Response, next: NextFunction) => {
        res.status(200).redirect('/dashboard');
    }
}

export default options;