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
Object.defineProperty(exports, "__esModule", { value: true });
class BaseService {
    constructor(model, defaultPopulate = []) {
        this.model = model;
        this.defaultPopulate = defaultPopulate;
    }
    clearAll() {
        if (process.env.NODE_ENV === 'localhost') {
            return new Promise((resolve, reject) => {
                this.model.deleteMany({}, () => {
                    resolve();
                });
            });
        }
    }
    createMany(rawObjects) {
        return __awaiter(this, void 0, void 0, function* () {
            const objects = rawObjects.map(object => {
                delete object._id;
                return new this.model(Object.assign({}, object));
            });
            return this.model.insertMany(objects);
        });
    }
    create(rawObject, populate = '') {
        return __awaiter(this, void 0, void 0, function* () {
            delete rawObject._id;
            console.log(rawObject, 'TTTTTTTTTTTTTT');
            try {
                const newObject = new this.model(Object.assign({}, rawObject));
                const saved = yield newObject.save();
                return saved;
            }
            catch (e) {
                console.log(e);
                throw e;
            }
        });
    }
    list(filters = {}, projection, populate, sort = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('filters-----------');
            // console.log(filters);
            return this.model
                .find(filters, projection)
                .sort(sort)
                .exec();
        });
    }
    update(id, document, populate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.model.updateOne({ _id: id }, document);
                return this.findById(id);
            }
            catch (err) {
                console.log(err);
            }
            return null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (id.length > 0) {
                    const _res = yield this.model.findOneAndDelete({ _id: id });
                    if (_res) {
                        return { _id: id };
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
            return null;
        });
    }
    deleteBy(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (filters) {
                    return yield this.model.deleteMany(filters);
                }
            }
            catch (err) {
                console.log(err);
            }
            return null;
        });
    }
    findById(id, populate = '') {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model
                    .findById(id)
                    .populate(this.defaultPopulate + populate)
                    .select(`-password`);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    find(filters, projection, populate, sort = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.find(filters);
            if (projection)
                query.select(projection);
            if (populate)
                query.populate(populate);
            if (sort) {
                query.sort(sort);
            }
            return query.exec();
        });
    }
    findOne(filters, projection, populate, sort = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.findOne(filters);
            if (projection)
                query.select(projection);
            if (populate)
                query.populate(populate);
            if (sort) {
                query.sort(sort);
            }
            return query.exec();
        });
    }
    countRowsByFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const $match = filter;
            const $group = {
                _id: null,
                count: { $sum: 1 },
            };
            const $project = {
                _id: 0,
            };
            const result = yield this.model.aggregate([{ $match }, { $group }, { $project }]);
            if (result.length === 0)
                return 0;
            return result[0].count;
        });
    }
}
exports.default = BaseService;
