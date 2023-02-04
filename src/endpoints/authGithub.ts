import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

let options = {
    methods: ["get"],
    endpoint: "/auth/github",
    middleware: false,
    callbackGET: passport.authenticate('github')
}

export default options;