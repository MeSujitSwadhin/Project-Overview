import mongoose from "mongoose";
import validator from "validator";
import Messages from "../utils/constants.js";

const adminSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: [true, Messages.ENTER_USERNAME],
        maxLength: [20, Messages.USERNAME_TOO_LONG],
        minLength: [4, Messages.USERNAME_TOO_SHORT],
        unique: true
    },
    email: {
        type: String,
        required: [true, Messages.ENTER_EMAIL],
        unique: true,
        validate: [validator.isEmail, Messages.INVALID_EMAIL]
    },
    phone_number: {
        type: String,
        required: [true, Messages.ENTER_PHONE],
        match: [/^\+\d{1,3}\d{10}$/, Messages.INVALID_PHONE],
        unique: true
    },
    password: {
        type: String,
        required: [true, Messages.ENTER_PASSWORD],
        minLength: [8, Messages.PASSWORD_TOO_SHORT],
        select: false
    },
    role: {
        type: String,
        default: "admin",
    },
    is_verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);
