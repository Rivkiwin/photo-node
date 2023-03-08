import { PhotoModel } from "../model/PhotoModel";
import UserModel from "../model/UserModel";
import BaseService from "./baseServer"

export class PhotoService extends BaseService {
    constructor() {
        super(PhotoModel);
    }
}