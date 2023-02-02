"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    googleId: String,
    fullname: String,
    premium: Boolean,
    accountType: String
});
exports.default = (0, mongoose_1.model)("GoogleUsers", userSchema);
