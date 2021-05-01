import { Schema } from "mongoose";
import { mongoose } from "../core/db";

const secretCode = new Schema({
    email: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
        expires: 600,
    },
});

export const CodeModel = mongoose.model("Code", secretCode);