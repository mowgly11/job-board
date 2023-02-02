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
const passport_google_oauth20_1 = require("passport-google-oauth20");
const config_json_1 = __importDefault(require("./config.json"));
const user_1 = __importDefault(require("./mongoDB/Schema/user"));
function initialisePassport(passport, getUserById) {
    const verify = (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
        let user = yield getUserById(profile.id);
        if (user)
            return done(null, profile);
        else {
            new user_1.default({
                googleId: profile.id,
                fullname: profile.displayName
            }).save();
            return done(null, profile);
        }
    });
    passport.use(new passport_google_oauth20_1.Strategy({
        clientID: config_json_1.default.client_id,
        clientSecret: config_json_1.default.client_secret,
        callbackURL: 'http://localhost:80/auth/google/callback'
    }, verify));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    });
}
exports.default = initialisePassport;
