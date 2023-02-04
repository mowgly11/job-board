import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github';
import config from './config.json';
import User from './mongoDB/Schema/user';

export default function initialisePassport(passport: any, getUserById: Function) {
    passport.use(new GoogleStrategy({
        clientID: config.google.client_id,
        clientSecret: config.google.client_secret,
        callbackURL: 'http://localhost:80/auth/google/callback'
    }, async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
        let user = await getUserById(profile.id);

        if (user) return done(null, profile);
        else {
            new User({
                id: profile.id,
                authType: profile.provider,
                username: profile.name.givenName,
                premium: false,
                accountType: ""
            }).save();

            return done(null, profile);
        }
    }));

    passport.use(new GitHubStrategy({
        clientID: config.github.client_id,
        clientSecret: config.github.client_secret,
        callbackURL: 'http://localhost:80/auth/github/callback'
    }, async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
        let user = await getUserById(profile.id);

        if (user) return done(null, profile);
        else {
            new User({
                id: profile.id,
                authType: profile.provider,
                username: profile.displayName,
                premium: false,
                accountType: ""
            }).save();

            return done(null, profile);
        }
    }));

    passport.serializeUser((user: ValidProfile, done: Function) => done(null, user.id));
    passport.deserializeUser((id: string, done: Function) => {
        return done(null, getUserById(id));
    });
}

interface ValidProfile {
    id: string,
    displayName: string,
    name?: {
        familyName: string, givenName: string
    },
    photos?: [
        {
            value: string
        }
    ],
    provider: string,
    _raw?: string,
    _json?: {
        sub: string,
        name: string,
        given_name: string,
        family_name: string,
        picture: string,

    }
}