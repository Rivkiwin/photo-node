import { getAuth } from "firebase-admin/auth";
import { PhotoModel } from "../model/PhotoModel";
import UserModel from "../model/UserModel";
import { PhotoService } from "../service/PhotoService";
import { UserService } from "../service/userService";
import BaseController, { accessTokenSecret } from "./BaseController";

var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export class UserController extends BaseController {
    constructor() {
        super(new UserService(), '/user', ['userId']);
        this.router.post('/login', this.login.bind(this));
        this.router.post('/signUp', this.create.bind(this));
        this.router.post('/getAllUsers', this.getListUsers.bind(this));

    }

    public async create(req: any, res: any): Promise<void> {

        const { user } = req.body;

        await bcrypt.hash(user.password, 10, async function (err: any, hash: any) {
            const results = await UserModel.create({ ...user, password: hash });
            let token = jwt.sign(
                {
                    username: user.name
                },
                accessTokenSecret,);
            if (results instanceof Error) {
                res.statusMessage = results.message;
                res.status(400).end();
                res.send()
            } else {
                res.send({ user: results, token });
            }
        });
    }


    async login(req: any, res: any) {
        const { user } = req.body;

        await UserModel.findOne({ email: user.email })
            .then((_user) => {
                if (!user) {
                    res.status(401).json({
                        sucess: false,
                        token: null,
                        err: 'Invalid Credentials'
                    });
                }
                bcrypt.compare(user.password, _user?.password, function (err: any, result: any) {
                    if (result === true) {

                        let token = jwt.sign(
                            {
                                username: user.name
                            },
                            accessTokenSecret,); // Signing the token
                        res.send({ user: _user, token });
                    }
                    else {
                        console.log("Entered Password and Hash do not match!");
                        res.status(401).send({
                            success: false,
                            token: null,
                            err: 'Entered Password and Hash do not match!'
                        });
                    }
                });
            })
    };

    getListUsers(req: any, res: any) {
        const users: object[] = [];
        console.log('getByMe');
        
        const listAllUsers = (nextPageToken?: any) => {
            getAuth()
                .listUsers(1000, nextPageToken)
                .then((listUsersResult) => {
                    listUsersResult.users.forEach((userRecord) => {
                        users.push(userRecord.toJSON())
                        console.log('user', userRecord.toJSON());
                    });
                    if (listUsersResult.pageToken) {
                        // List next batch of users.
                        listAllUsers(listUsersResult.pageToken);
                    } else {
                        res.send(users)
                    }
                })
                .catch((error) => {
                    console.log('Error listing users:', error);
                    res.status(401).send(error)
                });
        };
        // Start listing users from the beginning, 1000 at a time.
        listAllUsers();
    }
}