"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserController = void 0;
const auth_1 = require("firebase-admin/auth");
const UserModel_1 = __importDefault(require("../model/UserModel"));
const userService_1 = require("../service/userService");
const BaseController_1 = __importStar(require("./BaseController"));
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class UserController extends BaseController_1.default {
    constructor() {
        super(new userService_1.UserService(), '/user', ['userId']);
        this.router.post('/login', this.login.bind(this));
        this.router.post('/signUp', this.create.bind(this));
        this.router.post('/getAllUsers', this.getListUsers.bind(this));
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.body;
            yield bcrypt.hash(user.password, 10, function (err, hash) {
                return __awaiter(this, void 0, void 0, function* () {
                    const results = yield UserModel_1.default.create(Object.assign(Object.assign({}, user), { password: hash }));
                    let token = jwt.sign({
                        username: user.name
                    }, BaseController_1.accessTokenSecret);
                    if (results instanceof Error) {
                        res.statusMessage = results.message;
                        res.status(400).end();
                        res.send();
                    }
                    else {
                        res.send({ user: results, token });
                    }
                });
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.body;
            yield UserModel_1.default.findOne({ email: user.email })
                .then((_user) => {
                if (!user) {
                    res.status(401).json({
                        sucess: false,
                        token: null,
                        err: 'Invalid Credentials'
                    });
                }
                bcrypt.compare(user.password, _user === null || _user === void 0 ? void 0 : _user.password, function (err, result) {
                    if (result === true) {
                        let token = jwt.sign({
                            username: user.name
                        }, BaseController_1.accessTokenSecret); // Signing the token
                        res.send({ user: _user, token });
                    }
                    else {
                        console.log("Entered Password and Hash do not match!");
                        res.status(401).send({
                            success: false,
                            token: null,
                            err: 'Entered Password and Hash do not match!'
                        });
                    }
                });
            });
        });
    }
    ;
    getListUsers(req, res) {
        const users = [];
        console.log('getByMe');
        const listAllUsers = (nextPageToken) => {
            (0, auth_1.getAuth)()
                .listUsers(1000, nextPageToken)
                .then((listUsersResult) => {
                listUsersResult.users.forEach((userRecord) => {
                    users.push(userRecord.toJSON());
                    console.log('user', userRecord.toJSON());
                });
                if (listUsersResult.pageToken) {
                    // List next batch of users.
                    listAllUsers(listUsersResult.pageToken);
                }
                else {
                    res.send(users);
                }
            })
                .catch((error) => {
                console.log('Error listing users:', error);
                res.status(401).send(error);
            });
        };
        // Start listing users from the beginning, 1000 at a time.
        listAllUsers();
    }
}
exports.UserController = UserController;
