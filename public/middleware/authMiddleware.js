"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNotAuthenticated = exports.checkAuthenticated = void 0;
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
exports.checkAuthenticated = checkAuthenticated;
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return res.redirect('/protected');
    next();
}
exports.checkNotAuthenticated = checkNotAuthenticated;
