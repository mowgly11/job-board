"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
let options = {
    methods: ["get"],
    endpoint: "/auth/google/callback",
    middleware: passport_1.default.authenticate('google', { failureRedirect: '/login' }),
    callbackGET: function (req, res, next) {
        res.redirect('/protected');
    }
};
exports.default = options;
