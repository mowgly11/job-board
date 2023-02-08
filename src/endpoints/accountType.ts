import { Request, Response, NextFunction } from 'express';
import { checkAuthenticated } from '../middleware/authMiddleware';
import User from '../mongoDB/Schema/user';

let options = {
    methods: ["get", "post"],
    endpoint: "/accountType",
    middleware: checkAuthenticated,
    callbackGET: async (req: Request, res: Response, next: NextFunction) => {
        const id = req.session.passport.user;
        const user: User | null = await User.findOne({
            id: id
        });

        if (!user) return req.logOut((err) => {
            if (err) throw new Error("Error loggin out");
            return res.redirect("/login");
        });

        if (user && user.accountType !== "") return res.redirect("/dashboard");

        res.render("accountType.ejs", { auth: req.isAuthenticated() });
    },
    callbackPOST: async (req: Request, res: Response, next: NextFunction) => {
        const type: string = req.body.type;
        const id: string = req.session.passport.user;

        if(type !== "company" && type !== "worker") return res.send({ error: "Some Error Just Occured. Try Again Later" });

        const user: User | null = await User.findOne({
            id: id
        });

        if (!user) return req.logOut((err) => {
            if (err) throw new Error("Error loggin out");
            return res.redirect("/login");
        });

        if (user && user.accountType !== "") return res.redirect("/dashboard");

        user.accountType = `${type}`;

        user.save();

        res.redirect("/dashboard");
    }
}

export default options;

interface User {
    id: String;
    authType: String;
    username: {
        name: String;
        cooldown: Number;
    };
    premium: Boolean;
    accountType: String;
    save(): void;
}