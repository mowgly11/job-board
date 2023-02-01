"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
let port = 80;
app.listen(port, () => console.log("Up on port " + port));
let endpointsFiles = fs_1.default.readdirSync(path_1.default.join(__dirname, 'endpoints'));
endpointsFiles.forEach(f => {
    const file = require(`./endpoints/${f}`).default;
    if (file.methods[0] === "get")
        app.get(`${file.endpoint}`, file.callbackGET);
    if (file.methods[1] === "post")
        app.post(`${file.endpoint}`, file.callbackPOST);
    if (file.methods[2] === "delete")
        app.delete(`${file.endpoint}`, file.callbackDELETE);
});
