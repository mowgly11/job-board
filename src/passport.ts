import * as passport from 'passport';
import GoogleStrategy from 'passport-google-oidc';
import config from './config.json';

export default function initialisePassport() {
    const verify = function (issuer: any, profile: any, cb: any) {

    }

    passport.use(new GoogleStrategy({
        clientID: config.client_id,
        clientSecret: config.client_secret,
        callbackURL: 'http://localhost:3000/oauth2/redirect'
    }, verify));
}