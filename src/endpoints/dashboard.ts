import { Request, Response, NextFunction } from 'express';
import { checkAuthenticated } from '../middleware/authMiddleware';
import User from '../mongoDB/Schema/user';

let options = {
    methods: ["get"],
    endpoint: "/dashboard",
    middleware: checkAuthenticated,
    callbackGET: async function (req: Request, res: Response, next: NextFunction) {
        const id = req.session.passport.user;
        const user = await User.findOne({
            id: id
        });

        if (!user) return req.logOut((err) => {
            if (err) throw new Error("Error loggin out");
            return res.redirect("/login");
        });

        if(user && user.accountType === "") return res.redirect("/accountType");

        res.render("panel.ejs", { auth: req.isAuthenticated(), name: user.username?.name });
    }
}

export default options;