import { Schema, model } from "mongoose";

const userSchema = new Schema({
    id: String,
    authType: String,
    username: String,
    premium: {
        type: Boolean,
        default: false
    },
    accountType: String
});

export default model("GoogleUsers", userSchema);