import { Schema, model } from "mongoose";

const userSchema = new Schema({
    id: String,
    authType: String,
    username: {
        name: String,
        cooldown: Number,
    },
    premium: {
        type: Boolean,
        default: false
    },
    accountType: String
});

export default model("GoogleUsers", userSchema);