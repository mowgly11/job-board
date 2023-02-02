import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

let options = {
    methods: ["get"],
    endpoint: "/auth/google",
    middleware: false,
    callbackGET: passport.authenticate('google', { scope: ['profile'] })
}

export default options;