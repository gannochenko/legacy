import { Request, Response, Express, NextFunction } from 'express';

const useErrorHandler = (app: Express) => {
    // catching async unhandled rejections
    process
        .on('unhandledRejection', err => {
            logger.error('Unhandled rejection', err);
        })
        .on('uncaughtException', err => {
            logger.error('Uncaught exception', err);
        });

    // catching normal unhandled exceptions
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        logger.error('Uncaught exception', err);
        return res.send('Nasty error'); // todo: explain here
    });
};

export default useErrorHandler;
