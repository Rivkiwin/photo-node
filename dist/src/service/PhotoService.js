"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoService = void 0;
const PhotoModel_1 = require("../model/PhotoModel");
const baseServer_1 = __importDefault(require("./baseServer"));
class PhotoService extends baseServer_1.default {
    constructor() {
        super(PhotoModel_1.PhotoModel);
    }
}
exports.PhotoService = PhotoService;
