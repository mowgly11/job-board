import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from './config.json';
import User from './mongoDB/Schema/user';

export default function initialisePassport(passport: any, getUserById: Function) {
    const verify = async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
        let user = await getUserById(profile.id);

        if (user) return done(null, profile);
        else {
            new User({
                googleId: profile.id,
                fullname: profile.displayName
            }).save();

            return done(null, profile);
        }
    }

    passport.use(new GoogleStrategy({
        clientID: config.client_id,
        clientSecret: config.client_secret,
        callbackURL: 'http://localhost:80/auth/google/callback'
    }, verify));

    passport.serializeUser((user: ValidProfile, done: Function) => done(null, user.id));
    passport.deserializeUser((id: string, done: Function) => {
        return done(null, getUserById(id));
    });
}