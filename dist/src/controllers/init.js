"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = exports.albumService = void 0;
const AlbumController_1 = require("./AlbumController");
const PermissionsController_1 = require("./PermissionsController");
const PhotoController_1 = require("./PhotoController");
const UserController_1 = require("./UserController");
exports.albumService = new AlbumController_1.AlbumController();
exports.controllers = [
    new UserController_1.UserController(),
    exports.albumService,
    new PermissionsController_1.PermissionsController(),
    new PhotoController_1.PhotoController(),
];
