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
const endpointsFiles = fs_1.default.readdirSync(path_1.default.join(__dirname, 'endpoints'));
endpointsFiles.forEach(f => {
    const file = require(`./endpoints/${f}`).default;
    if (file.methods.indexOf('get') !== -1)
        app.get(`${file.endpoint}`, file.callbackGET);
    if (file.methods.indexOf('post') !== -1)
        app.post(`${file.endpoint}`, file.callbackPOST);
    if (file.methods.indexOf('delete') !== -1)
        app.delete(`${file.endpoint}`, file.callbackDELETE);
});
