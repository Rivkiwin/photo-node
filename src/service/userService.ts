import UserModel from "../model/UserModel";
import BaseService from "./baseServer"

export class UserService extends BaseService {
    constructor() {
        super(UserModel);
    }
}