"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt = require('bcrypt');
const userSchema = new mongoose_1.default.Schema({
    password: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
}, {
    timestamps: true
});
userSchema.pre('save', function (next) {
    // Check if document is new or a new password has been set
    if (this.isNew || this.isModified('password')) {
        // Saving reference to this because of changing scopes
        const document = this;
        bcrypt.hash(document.password, 10, function (err, hashedPassword) {
            if (err) {
                next(err);
            }
            else {
                document.password = hashedPassword;
                next();
            }
        });
    }
    else {
        next();
    }
});
const UserModel = mongoose_1.default.model('User', userSchema);
exports.default = UserModel;
