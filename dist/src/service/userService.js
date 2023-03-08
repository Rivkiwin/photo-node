"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserModel_1 = __importDefault(require("../model/UserModel"));
const baseServer_1 = __importDefault(require("./baseServer"));
class UserService extends baseServer_1.default {
    constructor() {
        super(UserModel_1.default);
    }
}
exports.UserService = UserService;
