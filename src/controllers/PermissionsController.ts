import { AlbumModel } from "../model/AlbumModel";
import { PermissionsModel } from "../model/PermissionsModel";
import { PhotoModel } from "../model/PhotoModel";
import UserModel from "../model/UserModel";
import { PermissionsService } from "../service/PermissionsService";
import { PhotoService } from "../service/PhotoService";
import BaseController from "./BaseController";

export class PermissionsController extends BaseController {
    constructor() {
        super(new PermissionsService(), '/permissions', ['userId', 'albumId']);
        this.router.get(`/:albumId`, this.getByAlbumAndUser.bind(this));
        this.router.get(`/:albumId/:userId`, this.getByAlbumAndUser.bind(this));
    }


    public async getByAlbumAndUser(
        req: any,
        res: any,
    ): Promise<void> {
        const { albumId, userId } = req.params;
        console.log('get by getByAlbumAndUser');
        const results = await this.service.find({ 'userId': userId, 'albumId': albumId });
        if (results instanceof Error) {
            res.statusMessage = results.message;
            res.status(400).end();
        } else {
            res.send(results);
        }
    }

    public async getByAlbum(
        req: any,
        res: any,
    ): Promise<void> {
        const { albumId } = req.params;
        console.log('get by getByAlbumAndUser');
        const results = await this.service.find({ 'albumId': albumId });
        if (results instanceof Error) {
            res.statusMessage = results.message;
            res.status(400).end();
        } else {
            const usersForAlbum = results.map(async permission => {
                let user = await UserModel.findById(permission.userId);
                return { ...permission, userName: user?.name }
            })
            res.send(usersForAlbum);
        }
    }

    public async create(
        req: any,
        res: any,
    ): Promise<void> {
        console.log('create');
        console.log('create');
        console.log('create');
        console.log('create');
        console.log(req);

        try {
            const newPermission = req.body;
            const existPermission = await this.service.findOne({ albumId: newPermission.albumId, userId: newPermission.userId });
           const album = await AlbumModel.findById(newPermission.albumId);
            if (existPermission || newPermission.userId === album?.createBy) {
                res.statusMessage = 'The user has already been shared in the album';
                console.log('err');
                res.status(400).send();
            }
            const results = await this.service.create(newPermission)
            console.log('res', results);

            if (results instanceof Error) {
                res.statusMessage = results.message;
                console.log('err');
                res.status(400).end();
                res.send()
            } else {
                res.send(results);
            }
        }
        catch (e) {
            console.log('err');
            res.status(400).end();
            res.send()
        }
    }
}