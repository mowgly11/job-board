import { Request, Response, NextFunction } from 'express';
import { checkAuthenticated } from '../middleware/authMiddleware';
import User from '../mongoDB/Schema/user';

let options = {
    methods: ["get"],
    endpoint: "/protected",
    middleware: checkAuthenticated,
    callbackGET: async function (req: Request, res: Response, next: NextFunction) {
        const id = req.session.passport.user;
        const user = await User.findOne({
            googleId: id
        });

        if (!user) return req.logOut((err) => {
            if (err) throw new Error("Error loggin out");
            return res.redirect("/login");
        });

        res.render("panel.ejs", { auth: req.isAuthenticated(), name: user.fullname });
    }
}

export default options;