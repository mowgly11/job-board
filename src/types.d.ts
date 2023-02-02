declare module 'passport-google-oidc' {
    import { Strategy as PassportStrategy } from 'passport';

    type VerifyFunction = (
        accessToken: string,
        refreshToken: string,
        profile: any,
        cb: (error: any, user?: any, info?: any) => void
    ) => void;

    interface StrategyOptions {
        clientID: string;
        clientSecret: string;
        callbackURL: string;
        userProfileURL?: string;
    }

    class OIDCStrategy extends PassportStrategy {
        constructor(options: StrategyOptions, verify: VerifyFunction);
    }

    export = OIDCStrategy;
}