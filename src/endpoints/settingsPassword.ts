import User from '../mongoDB/Schema/user';
import { Request, Response, NextFunction } from 'express';
import { checkAuthenticated } from '../middleware/authMiddleware';

let options = {
    methods: ["post"],
    endpoint: "/settings/password",
    middleware: checkAuthenticated,
    callbackPOST: async function (req: Request, res: Response, next: NextFunction) {
        const id = req.session.passport.user;
        const user = await User.findOne({
            id: id
        });

        if (!user || user.username == undefined) return req.logOut((err) => {
            if (err) throw new Error("Error loggin out");
            return res.redirect("/login");
        });

        if (user && user.accountType === "") return res.redirect("/accountType");
    }
}

export default options;