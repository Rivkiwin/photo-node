"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsService = void 0;
const PermissionsModel_1 = require("../model/PermissionsModel");
const baseServer_1 = __importDefault(require("./baseServer"));
class PermissionsService extends baseServer_1.default {
    constructor() {
        super(PermissionsModel_1.PermissionsModel);
    }
}
exports.PermissionsService = PermissionsService;
