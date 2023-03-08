import { AlbumModel } from "../model/AlbumModel";
import BaseService from "./baseServer"

export class AlbumService extends BaseService {
    constructor() {
        super(AlbumModel);
    }
}