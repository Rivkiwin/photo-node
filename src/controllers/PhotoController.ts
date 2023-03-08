import { PhotoModel } from "../model/PhotoModel";
import { PhotoService } from "../service/PhotoService";
import BaseController from "./BaseController";

export class PhotoController extends BaseController {
    constructor() {
        super(new PhotoService(), '/photo', ['albumId']);
    }
}