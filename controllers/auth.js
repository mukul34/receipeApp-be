import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { badRequest, internalServer, successResponse } from "../utils/response/index.js";
import { devLogger, errorLogger, infoLogger } from "../utils/logger/index.js";
import { ERROR_MESSAGES } from "../constant/index.js";

export const createUser = async (req, res) => {
    try {
        infoLogger("Auth", "createUser", req.body, "Request received for creating new user");
        const { name = "", userName = "", email = "", password = "" } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            userName,
            email,
            password: hashedPassword

        });

        return successResponse("User created");
    } catch (err) {
        errorLogger("Auth", "createUser", err, "Error in creating new user");
        return internalServer(res, err.message);

    }
};

export const createToken = async (req, res) => {
    try {
        infoLogger("Auth", "createToken", req.body, "Request received for creating new token");
        const { email = "", password = "" } = req.body;

        const user = await User.findOne({ email });

        devLogger("Auth", "createToken", user, "User data received for database")

        if (!user) return badRequest(res, ERROR_MESSAGES.USER_ALREADY_EXIST);

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return badRequest(res, ERROR_MESSAGES.INVALID_PASSWORD);

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return successResponse(res, "Token created", { token });
    } catch (error) {
        return internalServer(res, err.message);
    }
};