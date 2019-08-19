import { Request, Response, Express } from 'express';
// @ts-ignore
import { wrapError } from 'ew-internals';

const useHomeAPI = (app: Express) => {
    app.get(
        '/',
        wrapError(async (req: Request, res: Response) => {
            res.status(200).send('Hello');
        }),
    );
};

export default useHomeAPI;
