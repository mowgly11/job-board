import { Request, Response, NextFunction } from 'express';
import { checkAuthenticated } from '../middleware/authMiddleware';
import User from '../mongoDB/Schema/user';

let options = {
    methods: ["get", "post"],
    endpoint: "/accountType",
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

        if (user && user.accountType !== "") return res.redirect("/protected");

        res.render("accountType.ejs", { auth: req.isAuthenticated() });
    },
    callbackPOST: function (req: Request, res: Response, next: NextFunction) {
        const type: string = req.body.type;

        if(type !== "company" && type !== "worker") return res.send({ error: "Some Error Just Occured. Try Again Later" });
    }
}

export default options;