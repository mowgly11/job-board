import express, { Express } from 'express';
import fs from "fs";
import path from 'path';
import initialisePassport from './passport';
import initialiseMongoDB from './mongoDB/mongoDB';
import passport from 'passport';
import session from 'express-session';
import config from './config.json';
import User from './mongoDB/Schema/user';
import flash from 'express-flash';
import bodyParser from 'body-parser';
import methodOverride from "method-override";

initialiseMongoDB();
initialisePassport(passport,
    async (id: string) => await User.findOne({
        id: id
    }));

const app: Express = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(__dirname + '../views'));
app.use(session({
    secret: config.server.session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 48 }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

let port: number = 80;

const endpointsFiles: string[] = fs.readdirSync(path.join(__dirname, 'endpoints'));

endpointsFiles.forEach((f: string) => {
    const file = require(`./endpoints/${f}`).default;

    if (file.methods.find((e: string) => e === "get") != null) {
        if (file.middleware) app.get(`${file.endpoint}`, file.middleware, file.callbackGET);
        else app.get(`${file.endpoint}`, file.callbackGET);
    }

    if (file.methods.find((e: string) => e === 'post') != null) {
        if (file.middleware) app.post(`${file.endpoint}`, file.middleware, file.callbackPOST);
        else app.post(`${file.endpoint}`, file.callbackPOST);
    }

    if (file.methods.find((e: string) => e === 'delete') != null) {
        if (file.middleware) app.delete(`${file.endpoint}`, file.middleware, file.callbackDELETE);
        else app.delete(`${file.endpoint}`, file.callbackDELETE);
    }
});

app.listen(port, () => console.log("Up on port " + port));