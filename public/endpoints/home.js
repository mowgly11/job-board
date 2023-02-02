"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let options = {
    methods: ["get"],
    endpoint: "/",
    middleware: false,
    callbackGET: function (req, res, next) {
        res.render("index.ejs", { auth: req.isAuthenticated() });
    }
};
exports.default = options;
