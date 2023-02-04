import {Request, Response, NextFunction} from 'express';

let options = {
    methods: ["delete"],
    endpoint: "/logout",
    middleware: false,
    callbackDELETE: function (req: Request, res: Response, next: NextFunction) {
        req.logOut((err) => {
            if (err) return next(err);
        });
        res.redirect("/login");
    }
}

export default options;