
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { albumService, controllers } from "./src/controllers/init";
import { VerifyToken } from "./src/controllers/firebase-config";

var bcrypt = require('bcrypt');
const { expressjwt: jwt } = require("express-jwt");
const cookieParser = require('cookie-parser');


const uri = "mongodb+srv://rivkivinter:3aG4z0cvhZIo2mwa@cluster0.vhoox6j.mongodb.net/?retryWrites=true&w=majority";

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());


controllers.forEach((controller) => {
  app.use(controller.path, controller.router);
});
app.use('/sharedAlbums',albumService.shardRouter)
// app.u,se((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
//   next();
//   });

app.get("/", (req: any, res: { send: (arg0: string) => void; }) => {
  res.send("working fine");
});
//connect to db
mongoose.connect(uri);
const database = mongoose.connection
database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
