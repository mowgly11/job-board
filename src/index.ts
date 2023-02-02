import express from 'express';
import fs from "fs";
import path from 'path';
import initialisePassport from './passport';
import initialiseMongoDB from './mongoDB/mongoDB';
import passport from 'passport';
import session from 'express-session';
import config from './config.json';
import User from './mongoDB/Schema/user';
import flash from 'express-flash';

initialiseMongoDB();
initialisePassport(passport,
    async (id: string) => await User.findOne({
        googleId: id
    }));

const app = express();

app.set('view engine', 'ejs');
app.use(express.json({ limit: '100mb' }));
app.use(express.static(__dirname + '../views'));
app.use(session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 168 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

let port: number = 80;


const endpointsFiles: string[] = fs.readdirSync(path.join(__dirname, 'endpoints'));

endpointsFiles.forEach(f => {
    const file = require(`./endpoints/${f}`).default;

    if (file.methods.indexOf('get') !== -1) {
        if (file.middleware) app.get(`${file.endpoint}`, file.middleware, file.callbackGET);
        else app.get(`${file.endpoint}`, file.callbackGET);
    }

    if (file.methods.indexOf('post') !== -1) {
        if (file.middleware) app.post(`${file.endpoint}`, file.middleware, file.callbackPOST);
        else app.post(`${file.endpoint}`, file.callbackPOST);
    }

    if (file.methods.indexOf('delete') !== -1) {
        if (file.middleware) app.delete(`${file.endpoint}`, file.middleware, file.callbackDELETE);
        else app.post(`${file.endpoint}`, file.callbackDELETE);
    }
});

app.listen(port, () => console.log("Up on port " + port));