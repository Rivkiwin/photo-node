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
exports.PermissionsController = void 0;
const AlbumModel_1 = require("../model/AlbumModel");
const UserModel_1 = __importDefault(require("../model/UserModel"));
const PermissionsService_1 = require("../service/PermissionsService");
const BaseController_1 = __importDefault(require("./BaseController"));
class PermissionsController extends BaseController_1.default {
    constructor() {
        super(new PermissionsService_1.PermissionsService(), '/permissions', ['userId', 'albumId']);
        this.router.get(`/:albumId`, this.getByAlbumAndUser.bind(this));
        this.router.get(`/:albumId/:userId`, this.getByAlbumAndUser.bind(this));
    }
    getByAlbumAndUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { albumId, userId } = req.params;
            console.log('get by getByAlbumAndUser');
            const results = yield this.service.find({ 'userId': userId, 'albumId': albumId });
            if (results instanceof Error) {
                res.statusMessage = results.message;
                res.status(400).end();
            }
            else {
                res.send(results);
            }
        });
    }
    getByAlbum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { albumId } = req.params;
            console.log('get by getByAlbumAndUser');
            const results = yield this.service.find({ 'albumId': albumId });
            if (results instanceof Error) {
                res.statusMessage = results.message;
                res.status(400).end();
            }
            else {
                const usersForAlbum = results.map((permission) => __awaiter(this, void 0, void 0, function* () {
                    let user = yield UserModel_1.default.findById(permission.userId);
                    return Object.assign(Object.assign({}, permission), { userName: user === null || user === void 0 ? void 0 : user.name });
                }));
                res.send(usersForAlbum);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('create');
            console.log('create');
            console.log('create');
            console.log('create');
            console.log(req);
            try {
                const newPermission = req.body;
                const existPermission = yield this.service.findOne({ albumId: newPermission.albumId, userId: newPermission.userId });
                const album = yield AlbumModel_1.AlbumModel.findById(newPermission.albumId);
                if (existPermission || newPermission.userId === (album === null || album === void 0 ? void 0 : album.createBy)) {
                    res.statusMessage = 'The user has already been shared in the album';
                    console.log('err');
                    res.status(400).send();
                }
                const results = yield this.service.create(newPermission);
                console.log('res', results);
                if (results instanceof Error) {
                    res.statusMessage = results.message;
                    console.log('err');
                    res.status(400).end();
                    res.send();
                }
                else {
                    res.send(results);
                }
            }
            catch (e) {
                console.log('err');
                res.status(400).end();
                res.send();
            }
        });
    }
}
exports.PermissionsController = PermissionsController;
