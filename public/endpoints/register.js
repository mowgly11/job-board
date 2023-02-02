"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let options = {
    methods: ["get", "post"],
    endpoint: "/register",
    middleware: false,
    callbackGET: function (req, res, next) {
        res.render('register.ejs');
    },
    callbackPOST: function (req, res, next) {
    },
};
exports.default = options;
