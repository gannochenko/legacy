import { fn } from './function';

const makeResponse = (code, result) => {
    console.log(result);
    return {
        statusCode: code,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': process.env.CORS,
        },
        body: JSON.stringify(result),
    };
};

export const handler = (event, context, callback) => {
    const {
        // path,
        body: rawBody,
        httpMethod: method,
        headers,
        queryStringParameters: query,
        requestContext: { path, domainName },
    } = event;
    const safeHeaders = headers || {};

    const { functionName, memoryLimitInMB, getRemainingTimeInMillis } = context;

    // if (safeHeaders['Content-Type'] !== 'application/json') {
    //     return callback(null, makeResponse(400));
    // }

    let body = {};
    try {
        body = JSON.parse(rawBody);
    } catch (error) {
        return callback(null, makeResponse(400));
    }

    fn(body)
        .then((result) => {
            if (result.errors.length) {
                callback(null, makeResponse(400, result));
            } else {
                callback(null, makeResponse(200, result));
            }
        })
        .catch((error) => {
            console.error(error);
            callback(null, makeResponse(500));
        });

    return true;
};
