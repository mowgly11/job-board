import express from 'express';
import fs from "fs";
import path from 'path';

const app = express();

let port: number = 80;

app.listen(port, () => console.log("Up on port " + port));

let endpointsFiles = fs.readdirSync(path.join(__dirname, 'endpoints'));

endpointsFiles.forEach(f => {
    const file = require(`./endpoints/${f}`).default;

    if(file.methods[0] === "get") app.get(`${file.endpoint}`, file.callbackGET);
    if(file.methods[1] === "post") app.post(`${file.endpoint}`, file.callbackPOST);
    if(file.methods[2] === "delete") app.delete(`${file.endpoint}`, file.callbackDELETE);
});