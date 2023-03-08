"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const permissionsSchema = new mongoose_1.default.Schema({
    albumId: {
        required: true,
        type: String
    },
    userId: {
        required: true,
        type: String
    },
    share: {
        required: true,
        type: Boolean,
        default: false
    },
    add: {
        required: true,
        type: Boolean,
        default: false
    },
    delete: {
        required: true,
        type: Boolean,
        default: false
    },
    editPermissions: {
        required: true,
        type: Boolean,
        default: false
    },
    addBy: String,
}, { timestamps: true });
exports.PermissionsModel = mongoose_1.default.model('Permissions', permissionsSchema);
