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
exports.accessTokenSecret = void 0;
const express_1 = __importDefault(require("express"));
const firebase_config_1 = require("./firebase-config");
const jwt = require('jsonwebtoken');
exports.accessTokenSecret = 'tokenSecretPhotoRuth';
class BaseController {
    constructor(service, path, searchFields) {
        this.router = express_1.default.Router();
        this.authenticateJWT = (req, res, next) => {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                jwt.verify(token, exports.accessTokenSecret, (err, user) => {
                    if (err) {
                        return res.status(403).send({ err: 'Unauthorized' });
                    }
                    req.user = user;
                    next();
                });
            }
            else {
                res.status(401).send({ err: 'Unauthorized' });
            }
        };
        this.service = service;
        this.path = path;
        this.routes = [];
        this.searchFields = searchFields;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`/`, firebase_config_1.VerifyToken, this.list.bind(this));
        this.router.get(`/:id`, firebase_config_1.VerifyToken, this.getById.bind(this));
        this.router.post(`/`, firebase_config_1.VerifyToken, this.create.bind(this));
        this.router.put(`/:id`, firebase_config_1.VerifyToken, this.update.bind(this));
        this.router.delete(`/:id`, firebase_config_1.VerifyToken, this.delete.bind(this));
    }
    getRoutes() {
        return this.routes;
    }
    list(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (req.query);
                console.log(req.query, 'get');
                const filters = {};
                if (query) {
                    filters['$or'] = [];
                    (_a = this.searchFields) === null || _a === void 0 ? void 0 : _a.forEach(searchField => {
                        filters['$or'].push({ [searchField]: query[searchField] });
                    });
                }
                console.log(filters, 'filtersss');
                const results = yield this.service.list(filters);
                if (results instanceof Error) {
                    res.statusMessage = results.message;
                    res.status(400).end();
                    res.send(results);
                }
                else {
                    console.log(results, 'ressssssssss');
                    res.send(results);
                }
            }
            catch (err) {
                res.status('401').send(err);
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
                const results = yield this.service.create(req.body);
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
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log('get by id================');
            const results = yield this.service.findById(id);
            if (results instanceof Error) {
                res.statusMessage = results.message;
                res.status(400).end();
            }
            else {
                res.send(results);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('update crud');
            console.log('update crud');
            console.log('update crud');
            const results = yield this.service.update(req.params.id, req.body);
            if (results instanceof Error) {
                res.statusMessage = results.message;
                res.status(400).end();
            }
            else {
                res.send(results);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
exports.default = BaseController;
