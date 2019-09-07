import { Request, Response, Express, NextFunction } from 'express';
import { logError } from '@bucket-of-bolts/util';

const useErrorHandler = (app: Express) => {
    // catching async unhandled rejections
    process
        .on('unhandledRejection', error => {
            logError('Unhandled rejection', error as Error);
        })
        .on('uncaughtException', error => {
            logError('Uncaught exception', error);
        });

    // catching normal unhandled exceptions
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        logError('Uncaught exception', err);
        return res.send('Nasty error'); // todo: explain here
    });
};

export default useErrorHandler;
