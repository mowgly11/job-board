"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
let options = {
    methods: ["get"],
    endpoint: "/auth/google",
    middleware: false,
    callbackGET: passport_1.default.authenticate('google', { scope: ['profile'] })
};
exports.default = options;
