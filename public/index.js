"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("./passport"));
const mongoDB_1 = __importDefault(require("./mongoDB/mongoDB"));
const passport_2 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const config_json_1 = __importDefault(require("./config.json"));
const user_1 = __importDefault(require("./mongoDB/Schema/user"));
const express_flash_1 = __importDefault(require("express-flash"));
(0, mongoDB_1.default)();
(0, passport_1.default)(passport_2.default, (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findOne({
        googleId: id
    });
}));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(express_1.default.json({ limit: '100mb' }));
app.use(express_1.default.static(__dirname + '../views'));
app.use((0, express_session_1.default)({
    secret: config_json_1.default.session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 168 }
}));
app.use((0, express_flash_1.default)());
app.use(passport_2.default.initialize());
app.use(passport_2.default.session());
let port = 80;
const endpointsFiles = fs_1.default.readdirSync(path_1.default.join(__dirname, 'endpoints'));
endpointsFiles.forEach(f => {
    const file = require(`./endpoints/${f}`).default;
    if (file.methods.indexOf('get') !== -1) {
        if (file.middleware)
            app.get(`${file.endpoint}`, file.middleware, file.callbackGET);
        else
            app.get(`${file.endpoint}`, file.callbackGET);
    }
    if (file.methods.indexOf('post') !== -1) {
        if (file.middleware)
            app.post(`${file.endpoint}`, file.middleware, file.callbackPOST);
        else
            app.post(`${file.endpoint}`, file.callbackPOST);
    }
    if (file.methods.indexOf('delete') !== -1) {
        if (file.middleware)
            app.delete(`${file.endpoint}`, file.middleware, file.callbackDELETE);
        else
            app.post(`${file.endpoint}`, file.callbackDELETE);
    }
});
app.listen(port, () => console.log("Up on port " + port));
