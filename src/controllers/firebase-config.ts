import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccountKey from "./serviceAccountKey.json";
var admin = require("firebase-admin");

const app = initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
});

const auth = getAuth(app);

export const VerifyToken = async (req: any, res: any, next: any) => {    
    const token = req.headers.authorization?.split(" ")[1];

    try {
        const decodeValue = await auth.verifyIdToken(token);
        if (decodeValue) {
            req.user = decodeValue;
            return next();
        }
    } catch (e) {
        res.status(401).send({err: 'Unauthorized'});
    }
};
export default auth;