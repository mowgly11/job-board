import {Request, Response, NextFunction} from 'express';
import { checkNotAuthenticated } from '../middleware/authMiddleware';

let options = {
    methods: ["get"],
    endpoint: "/login",
    middleware: checkNotAuthenticated,
    callbackGET: function (req: Request, res: Response, next: NextFunction) {
        res.status(200).render('login.ejs');
    }
}

export default options;