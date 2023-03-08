"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumService = void 0;
const AlbumModel_1 = require("../model/AlbumModel");
const baseServer_1 = __importDefault(require("./baseServer"));
class AlbumService extends baseServer_1.default {
    constructor() {
        super(AlbumModel_1.AlbumModel);
    }
}
exports.AlbumService = AlbumService;
