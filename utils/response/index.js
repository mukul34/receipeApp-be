export const successResponse = (res, message, data = {}) => {
    return res.status(200).json({
        status: 200,
        message,
        data
    });
};

export const badRequest = (res, message, data = {}) => {
    return res.status(400).json({
        status: 400,
        message,
        data
    });
};

export const internalServer = (res, message, data = {}) => {
    return res.status(500).json({
        status: 500,
        message,
        data
    });
};

export const unAuthorised = (res, message, data = {}) => {
    console.log("response---------", res);
    return res.status(401).json({
        status: 401,
        message,
        data
    });
};
