import { PermissionsModel } from "../model/PermissionsModel";
import BaseService from "./baseServer"

export class PermissionsService extends BaseService {
    constructor() {
        super(PermissionsModel);
    }
}