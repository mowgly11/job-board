import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

let options = {
    methods: ["get"],
    endpoint: "/auth/github/callback",
    middleware: passport.authenticate('github', { failureRedirect: '/login' }),
    callbackGET: (req: Request, res: Response, next: NextFunction) => {
        res.redirect('/protected');
    }
}

export default options;