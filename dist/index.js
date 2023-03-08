"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const init_1 = require("./src/controllers/init");
var bcrypt = require('bcrypt');
const { expressjwt: jwt } = require("express-jwt");
const cookieParser = require('cookie-parser');
const uri = "mongodb+srv://rivkivinter:3aG4z0cvhZIo2mwa@cluster0.vhoox6j.mongodb.net/?retryWrites=true&w=majority";
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use(cookieParser());
init_1.controllers.forEach((controller) => {
    app.use(controller.path, controller.router);
});
app.use('/sharedAlbums', init_1.albumService.shardRouter);
// app.u,se((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
//   next();
//   });
app.get("/", (req, res) => {
    res.send("working fine");
});
//connect to db
mongoose_1.default.connect(uri);
const database = mongoose_1.default.connection;
database.on('error', (error) => {
    console.log(error);
});
database.once('connected', () => {
    console.log('Database Connected');
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
