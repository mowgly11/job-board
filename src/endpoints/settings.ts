import { Request, Response, NextFunction } from 'express';
import { checkAuthenticated } from '../middleware/authMiddleware';
import User from '../mongoDB/Schema/user';
import Filter from "bad-words";
import BadWordsFilter from "bad-words";

let options = {
    methods: ["get", "post"],
    endpoint: "/settings",
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

        res.render("settings.ejs", { auth: req.isAuthenticated(), name: user.username, provider: user.authType });
    },
    callbackPOST: async function (req: Request, res: Response, next: NextFunction) {
        const id = req.session.passport.user;
        const user = await User.findOne({
            id: id
        });

        if (!user) return req.logOut((err) => {
            if (err) throw new Error("Error loggin out");
            return res.redirect("/login");
        });

        if(user && user.accountType === "") return res.redirect("/accountType");

        const filter: BadWordsFilter = new Filter();

        const username: string = req.body.newName;

        if(username === "" || !username) return res.send({ error: "You Must Specify A Username." });
        if(filter.isProfane(username)) return res.send({ error: "Please Use A Proper Language On Your Username" });

        res.send({ message: "Username Set Successfully to " + username })
    }
}

export default options;