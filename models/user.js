import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        unique: [true, "This Username is already taken!!"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "An account already exist with this email!!"]
    },
    password: {
        type: String,
    }
}, { timestamps: true });

export default model("User", userSchema);