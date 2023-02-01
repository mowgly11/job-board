"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let options = {
    methods: ["get"],
    endpoint: "/",
    callbackGET: function (req, res, next) {
        res.send('Hello!');
    }
};
exports.default = options;
