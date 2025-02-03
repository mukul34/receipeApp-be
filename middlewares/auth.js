import jwt from "jsonwebtoken";
import { unAuthorised } from "../utils/response/index.js";

export const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return unAuthorised(res, "Unauthorised");

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return unAuthorised(res, "Unauthorised");
    }
};