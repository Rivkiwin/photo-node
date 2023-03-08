import express, { Router } from 'express';
import * as http from 'http';
import { AlbumModel } from '../model/AlbumModel';
import { PermissionsModel } from '../model/PermissionsModel';
import { PhotoModel } from '../model/PhotoModel';
import { AlbumService } from '../service/AlbumService';
import { PermissionsService } from '../service/PermissionsService';
import BaseController from './BaseController';
import { VerifyToken } from './firebase-config';


export class AlbumController extends BaseController {
    public shardRouter = express.Router();
    constructor() {
        super(new AlbumService(), '/album', ['title', 'createBy']);
        this.shardRouter.get('/:userId', this.getSharedAlbums);
    }

    public async getSharedAlbums(req: any, res: any): Promise<void> {
        console.log('getSharedAlbums');

        try {
            const { userId } = req.params;
            console.log(userId, 'userId');

            const albumsPermissions: any = await PermissionsModel.find({ userId })
            console.log(albumsPermissions, 'albums');

            const results = await Promise.all(albumsPermissions.map(async (permissions: any) => {
                const album = await AlbumModel.findById(permissions.albumId);
                return { album, permissions }
            }))
            if (results instanceof Error) {
                res.statusMessage = results.message;
                res.status(400).end();
                res.send(results)
            } else {
                res.send(results);
            }
        } catch (err) { res.send(err); }
    }

    public async delete(
        req: any,
        res: any,
    ): Promise<void> {
        console.log('delete');

         await PermissionsModel.deleteMany({ albumId: req.params.id });
         await PhotoModel.deleteMany({ albumId: req.params.id });


        const results = await this.service.delete(req.params.id);
        if (results instanceof Error) {
            res.statusMessage = results.message;
            res.status(400).end();
        } else {
            res.send(results);
        }
    }
}
