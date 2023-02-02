import express from 'express';
import fs from "fs";
import path from 'path';
import initialisePassport from './passport';

const app = express();

let port: number = 80;

app.listen(port, () => console.log("Up on port " + port));

const endpointsFiles: string[] = fs.readdirSync(path.join(__dirname, 'endpoints'));

endpointsFiles.forEach(f => {
    const file = require(`./endpoints/${f}`).default;

    if(file.methods.indexOf('get') !== -1) app.get(`${file.endpoint}`, file.callbackGET);
    if(file.methods.indexOf('post') !== -1) app.post(`${file.endpoint}`, file.callbackPOST);
    if(file.methods.indexOf('delete') !== -1) app.delete(`${file.endpoint}`, file.callbackDELETE);
});