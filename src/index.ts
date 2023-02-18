import express, { Express, Request, Response, NextFunction } from 'express';
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
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

const limiter: RateLimitRequestHandler = rateLimit({
    max: 3,
    windowMs: 900000,
    standardHeaders: true,
    message: 'Too many accounts created from this IP, please try again after half an hour',
	legacyHeaders: false,
});

export { limiter }

initialiseMongoDB();
initialisePassport(passport,
    async (id: string) => await User.findOne({
        id: id
    }));

const app: Express = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('C:\\Users\\oussa\\OneDrive\\Bureau\\workspace\\job-board\\views\\'));
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

const endpointsFiles: string[] = fs.readdirSync(path.join(__dirname, 'endpoints')).filter(f => f.endsWith(".ts") || f.endsWith(".js"));

endpointsFiles.forEach((f: string) => {
    const file = require(`./endpoints/${f}`).default;

    if (file.methods.find((e: string) => e === "get") != null) {
        if (file.middleware) app.get(`${file.endpoint}`, file.middleware, file.callbackGET);
        else app.get(`${file.endpoint}`, file.callbackGET);
    }

    if (file.methods.find((e: string) => e === 'post') != null) {
        if (file.middleware) app.post(`${file.endpoint}`, file.middleware, file.callbackPOST);
        if (file.middleware2) app.post(`${file.endpoint}`, file.middleware, file.middleware2, file.callbackPOST);
        else app.post(`${file.endpoint}`, file.callbackPOST);
    }

    if (file.methods.find((e: string) => e === 'delete') != null) {
        if (file.middleware) app.delete(`${file.endpoint}`, file.middleware, file.callbackDELETE);
        else app.delete(`${file.endpoint}`, file.callbackDELETE);
    }
});

app.all('*', (req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => console.log("Up on port " + port));