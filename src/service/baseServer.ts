import { Model } from "mongoose";

class BaseService {
    protected model: Model<any>;
    readonly defaultPopulate: any;

    constructor(model: any, defaultPopulate: any=[]) {
        this.model = model;
        this.defaultPopulate = defaultPopulate;
    }

    clearAll() {
        if (process.env.NODE_ENV === 'localhost') {
            return new Promise<void>((resolve, reject) => {
                this.model.deleteMany({}, () => {
                    resolve();
                });
            });
        }
    }

    async createMany(rawObjects: any[]) {
        const objects = rawObjects.map(object => {
            delete object._id;
            return new this.model({ ...object });
        });
        return this.model.insertMany(objects);
    }

    async create(rawObject: any, populate = ''): Promise<any> {

        delete rawObject._id;
        console.log(rawObject,'TTTTTTTTTTTTTT');
        
        try {
            const newObject = new this.model({ ...rawObject });
            const saved = await newObject.save();
            return saved;
        } catch (e) {
         console.log(e);
         
            throw e;
        }
    }

    async list(filters: object = {}, projection?: any, populate?: string | object, sort: Record<string, any> = {}) {
        // console.log('filters-----------');
        
        // console.log(filters);
        
        return this.model
            .find(filters, projection)
            .sort(sort)
            .exec();
    }

    async update(id: string, document: any, populate?: string) {
        try {
            await this.model.updateOne({ _id: id }, document);
            return this.findById(id);
        } catch (err) {
           console.log(err);
           
        }
        return null;
    }

    async delete(id: string) {
        try {
            if (id.length > 0) {
                const _res = await this.model.findOneAndDelete({ _id: id });
                if (_res) {
                    return { _id: id };
                }
            }
        } catch (err) {
           console.log(err);
           
        }
        return null;
    }

    async deleteBy(filters: any) {
        try {
            if (filters) {
                return await this.model.deleteMany(filters);
            }
        } catch (err) {
            console.log(err);
        }
        return null;
    }

    async findById(id: string, populate = '') {
        try {
            return await this.model
                .findById(id)
                .populate(this.defaultPopulate + populate)
                .select(`-password`);
        } catch (err) {
            console.log(err);
            
        }
    }

    async find(filters: any, projection?: any, populate?: any, sort: Record<string, any> = {}): Promise<Array<any>> {
        const query = this.model.find(filters);        
        if (projection) query.select(projection);
        if (populate) query.populate(populate);
        if (sort) {
            query.sort(sort);
        }
        return query.exec();
    }

    async findOne(filters: any, projection?: any, populate?: any, sort: Record<string, any> = {}): Promise<any> {
        const query = this.model.findOne(filters);
        if (projection) query.select(projection);
        if (populate) query.populate(populate);
        if (sort) {
            query.sort(sort);
        }
        return query.exec();
    }

    async countRowsByFilter(filter: object) {
        const $match = filter;
        const $group: any = {
            _id: null,
            count: { $sum: 1 },
        };
        const $project = {
            _id: 0,
        };
        const result: any = await this.model.aggregate([{ $match }, { $group }, { $project }]);
        if (result.length === 0) return 0;
        return result[0].count;
    }
}

export default BaseService;
