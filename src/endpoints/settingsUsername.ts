import User from '../mongoDB/Schema/user';
import Filter from "bad-words";
import BadWordsFilter from "bad-words";
import { Request, Response, NextFunction } from 'express';
import { checkAuthenticated } from '../middleware/authMiddleware';

let options = {
    methods: ["post"],
    endpoint: "/settings/:option",
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

        const option = req.params.option;

        switch (option) {
            default:
                res.status(404).send({ error: "Invalid Parameter" });
                break;
            case 'username':
                const filter: BadWordsFilter = new Filter();

                const username: string = req.body.newName;

                const timeLeft: number = Date.now() - Number(user.username.cooldown);
                let left = parseInt(String(-1 * timeLeft / 1000));

                if (timeLeft < 0) return res.status(401).send({ error: `You're In Cooldown, Please wait for ${left}s to perform this action again.` })
                if (username === "" || !username) return res.status(400).send({ error: "You Must Specify A Username." });
                if (filter.isProfane(username)) return res.status(400).send({ error: "Please Use A Proper Language On Your Username" });
                if (username.length > 30 || username.length < 4) return res.send({ error: "The username length should be between 4 and 30 charecters" });

                user.username.name = username;
                user.username.cooldown = Date.now() + 60000;

                await user.save();

                res.status(200).send({ message: "Username Set Successfully to " + username });
                break;
            case 'description':

        }
    }
}

export default options;