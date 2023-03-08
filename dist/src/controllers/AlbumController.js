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
exports.AlbumController = void 0;
const express_1 = __importDefault(require("express"));
const AlbumModel_1 = require("../model/AlbumModel");
const PermissionsModel_1 = require("../model/PermissionsModel");
const PhotoModel_1 = require("../model/PhotoModel");
const AlbumService_1 = require("../service/AlbumService");
const BaseController_1 = __importDefault(require("./BaseController"));
class AlbumController extends BaseController_1.default {
    constructor() {
        super(new AlbumService_1.AlbumService(), '/album', ['title', 'createBy']);
        this.shardRouter = express_1.default.Router();
        this.shardRouter.get('/:userId', this.getSharedAlbums);
    }
    getSharedAlbums(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('getSharedAlbums');
            try {
                const { userId } = req.params;
                console.log(userId, 'userId');
                const albumsPermissions = yield PermissionsModel_1.PermissionsModel.find({ userId });
                console.log(albumsPermissions, 'albums');
                const results = yield Promise.all(albumsPermissions.map((permissions) => __awaiter(this, void 0, void 0, function* () {
                    const album = yield AlbumModel_1.AlbumModel.findById(permissions.albumId);
                    return { album, permissions };
                })));
                if (results instanceof Error) {
                    res.statusMessage = results.message;
                    res.status(400).end();
                    res.send(results);
                }
                else {
                    res.send(results);
                }
            }
            catch (err) {
                res.send(err);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('delete');
            yield PermissionsModel_1.PermissionsModel.deleteMany({ albumId: req.params.id });
            yield PhotoModel_1.PhotoModel.deleteMany({ albumId: req.params.id });
            const results = yield this.service.delete(req.params.id);
            if (results instanceof Error) {
                res.statusMessage = results.message;
                res.status(400).end();
            }
            else {
                res.send(results);
            }
        });
    }
}
exports.AlbumController = AlbumController;
