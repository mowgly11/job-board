import { Schema, model } from "mongoose";

const userSchema = new Schema({
    googleId: String,
    fullname: String,
    premium: Boolean,
    accountType: String
});

export default model("GoogleUsers", userSchema);