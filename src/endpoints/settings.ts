import { Request, Response, NextFunction } from 'express';
import { checkAuthenticated } from '../middleware/authMiddleware';
import User from '../mongoDB/Schema/user';

let options = {
    methods: ["get"],
    endpoint: "/settings",
    middleware: checkAuthenticated,
    callbackGET: async function (req: Request, res: Response, next: NextFunction) {
        const id = req.session.passport.user;
        const user = await User.findOne({
            id: id
        });

        if (!user || user.username == undefined) return req.logOut((err) => {
            if (err) throw new Error("Error loggin out");
            return res.status(401).redirect("/login");
        });

        if (user && user.accountType === "") return res.status(401).redirect("/accountType");

        res.status(200).render("settings.ejs", {
            auth: req.isAuthenticated(),
            name: user.username.name,
            provider: user.authType,
            picture: user.picture
        });
    },
}

export default options;