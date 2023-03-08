import { AlbumController } from "./AlbumController";
import BaseController from "./BaseController";
import { PermissionsController } from "./PermissionsController";
import { PhotoController } from "./PhotoController";
import { UserController } from "./UserController";

export const albumService =  new AlbumController();


export const controllers: BaseController[] = [
    new UserController(),
    albumService,
    new PermissionsController(),
    new PhotoController(),
]