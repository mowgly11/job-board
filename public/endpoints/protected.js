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
const authMiddleware_1 = require("../middleware/authMiddleware");
const user_1 = __importDefault(require("../mongoDB/Schema/user"));
let options = {
    methods: ["get"],
    endpoint: "/protected",
    middleware: authMiddleware_1.checkAuthenticated,
    callbackGET: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.session.passport.user;
            const user = yield user_1.default.findOne({
                googleId: id
            });
            if (!user)
                return req.logOut((err) => {
                    if (err)
                        throw new Error("Error loggin out");
                    return res.redirect("/login");
                });
            if (user && user.accountType === "")
                return res.redirect("/accountType");
            res.render("panel.ejs", { auth: req.isAuthenticated(), name: user.fullname });
        });
    }
};
exports.default = options;
