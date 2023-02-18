import { Request, Response, NextFunction } from 'express';

let options = {
    methods: ["get"],
    endpoint: "/",
    middleware: false,
    callbackGET: function (req: Request, res: Response, next: NextFunction) {
        res.status(200).render("index.ejs", { auth: req.isAuthenticated() });
    }
}

export default options;