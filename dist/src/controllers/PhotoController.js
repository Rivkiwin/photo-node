"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoController = void 0;
const PhotoService_1 = require("../service/PhotoService");
const BaseController_1 = __importDefault(require("./BaseController"));
class PhotoController extends BaseController_1.default {
    constructor() {
        super(new PhotoService_1.PhotoService(), '/photo', ['albumId']);
    }
}
exports.PhotoController = PhotoController;
