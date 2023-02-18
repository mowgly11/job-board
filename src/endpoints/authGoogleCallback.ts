import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

let options = {
    methods: ["get"],
    endpoint: "/auth/google/callback",
    middleware: passport.authenticate('google', { failureRedirect: '/login' }),
    callbackGET: function (req: Request, res: Response, next: NextFunction) {
        res.status(200).redirect('/dashboard');
    }
}

export default options;