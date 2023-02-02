"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = require("../middleware/authMiddleware");
let options = {
    methods: ["get"],
    endpoint: "/login",
    middleware: authMiddleware_1.checkNotAuthenticated,
    callbackGET: function (req, res, next) {
        res.render('login.ejs');
    }
};
exports.default = options;
