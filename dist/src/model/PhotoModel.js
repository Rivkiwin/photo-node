"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const photoSchema = new mongoose_1.default.Schema({
    albumId: {
        required: true,
        type: String
    },
    title: String,
    url: {
        required: true,
        type: String
    },
    addBy: String
}, {
    timestamps: true,
});
exports.PhotoModel = mongoose_1.default.model('Photo', photoSchema);
