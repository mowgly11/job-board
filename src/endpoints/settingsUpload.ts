import {Request, Response, NextFunction} from 'express';
import { upload } from '../index';
import { checkAuthenticated } from '../middleware/authMiddleware';

let options = {
    methods: ["post"],
    endpoint: "/settings/upload",
    middleware: checkAuthenticated,
    callbackPOST: function (req: Request, res: Response, next: NextFunction) {
        upload.single("avatar")(req, res, next);
        res.send("Photo Updated.")
    }
}

export default options;