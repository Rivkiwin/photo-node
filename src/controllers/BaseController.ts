import express from 'express';
import * as http from 'http';
import BaseService from '../service/baseServer';
import { VerifyToken } from './firebase-config';
const jwt = require('jsonwebtoken');
export const accessTokenSecret = 'tokenSecretPhotoRuth'

class BaseController {
    protected service: BaseService;
    protected searchFields?: string[];
    protected routes: object[];
    public path: string;
    public router = express.Router();

    constructor(service: BaseService, path: string, searchFields?: string[]) {
        this.service = service;
        this.path = path;
        this.routes = [];
        this.searchFields = searchFields;
        this.initializeRoutes();
    }

    protected initializeRoutes(): void {
        this.router.get(`/`, VerifyToken, this.list.bind(this));
        this.router.get(`/:id`, VerifyToken, this.getById.bind(this));
        this.router.post(`/`, VerifyToken, this.create.bind(this));
        this.router.put(`/:id`, VerifyToken, this.update.bind(this));
        this.router.delete(`/:id`, VerifyToken, this.delete.bind(this));
    }

    public getRoutes(): object[] {
        return this.routes;
    }

    public async list(
        req: any,
        res: any
    ): Promise<void> {
    
        try {
            const query = (req.query)
            console.log(req.query, 'get');

            const filters: any = {};
            if (query) {
                filters['$or'] = [];
                this.searchFields?.forEach(searchField => {
                    filters['$or'].push({ [searchField]: query[searchField] });
                });
            }
            console.log(filters, 'filtersss');

            const results = await this.service.list(filters);
            if (results instanceof Error) {
                res.statusMessage = results.message;
                res.status(400).end();
                res.send(results)
            } else {
                console.log(results, 'ressssssssss');
                
                res.send(results);
            }
        } catch (err) { res.status('401').send(err); }
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

      try { const results = await this.service.create(req.body)
        console.log('res', results);

        if (results instanceof Error) {
            res.statusMessage = results.message;
            console.log('err');
            res.status(400).end();
            res.send()
        } else {
            res.send(results);
        }}
        catch(e){
            console.log('err');
            res.status(400).end();
            res.send()
        }
        }

    public async getById(
        req: any,
        res: any,
    ): Promise<void> {
        const { id } = req.params;
        console.log('get by id================');
        const results = await this.service.findById(id);
        if (results instanceof Error) {
            res.statusMessage = results.message;
            res.status(400).end();
        } else {
            res.send(results);
        }
    }

    public async update(
        req: any,
        res: any,
    ): Promise<void> {
        console.log('update crud');
        console.log('update crud');
        console.log('update crud');

        const results = await this.service.update(req.params.id, req.body);
        if (results instanceof Error) {
            res.statusMessage = results.message;
            res.status(400).end();
        } else {
            res.send(results);
        }
    }

    public async delete(
        req: any,
        res: any,
    ): Promise<void> {
        const results = await this.service.delete(req.params.id);
        if (results instanceof Error) {
            res.statusMessage = results.message;
            res.status(400).end();
        } else {
            res.send(results);
        }
    }
    authenticateJWT = (req: any, res: any, next: any) => {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, accessTokenSecret, (err: any, user: any) => {
                if (err) {
                    return res.status(403).send({ err: 'Unauthorized' });
                }

                req.user = user;
                next();
            });
        } else {
            res.status(401).send({ err: 'Unauthorized' });
        }
    };
}

export default BaseController;
