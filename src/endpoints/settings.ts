import { Request, Response, NextFunction } from 'express';
import { checkAuthenticated } from '../middleware/authMiddleware';
import User from '../mongoDB/Schema/user';
import Filter from "bad-words";
import BadWordsFilter from "bad-words";
import { limiter } from '../index';

let options = {
    methods: ["get", "post"],
    endpoint: "/settings",
    middleware: checkAuthenticated,
    callbackGET: async function (req: Request, res: Response, next: NextFunction) {
        const id = req.session.passport.user;
        const user = await User.findOne({
            id: id
        });

        if (!user || user.username == undefined) return req.logOut((err) => {
            if (err) throw new Error("Error loggin out");
            return res.redirect("/login");
        });

        if (user && user.accountType === "") return res.redirect("/accountType");

        res.render("settings.ejs", {
            auth: req.isAuthenticated(),
            name: user.username.name,
            provider: user.authType,
            picture: user.picture
        });
    },
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

        const filter: BadWordsFilter = new Filter();

        const username: string = req.body.newName;

        const timeLeft: number = Date.now() - Number(user.username.cooldown);
        let left = parseInt(String(-1 * timeLeft / 1000));

        if(timeLeft < 0) return res.send({ error: `Your In Cooldown, Please wait for ${left}s to perform this action again.` })
        if (username === "" || !username) return res.send({ error: "You Must Specify A Username." });
        if (filter.isProfane(username)) return res.send({ error: "Please Use A Proper Language On Your Username" });
        if (username.length > 30) return res.send({ error: "The username length should be between 4 and 30 charecters" });

        user.username.name = username;
        user.username.cooldown = Date.now() + 60000;

        await user.save();

        res.send({ message: "Username Set Successfully to " + username });
    }
}

export default options;