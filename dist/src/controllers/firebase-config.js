"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = void 0;
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const serviceAccountKey_json_1 = __importDefault(require("./serviceAccountKey.json"));
var admin = require("firebase-admin");
const app = (0, app_1.initializeApp)({
    credential: admin.credential.cert(serviceAccountKey_json_1.default),
});
const auth = (0, auth_1.getAuth)(app);
const VerifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    try {
        const decodeValue = yield auth.verifyIdToken(token);
        if (decodeValue) {
            req.user = decodeValue;
            return next();
        }
    }
    catch (e) {
        res.status(401).send({ err: 'Unauthorized' });
    }
});
exports.VerifyToken = VerifyToken;
exports.default = auth;
