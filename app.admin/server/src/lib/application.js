import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { Settings, logger } from 'ew-internals';

import attachHomeAPI from '../api/home';

export default class Application {
    static async make() {
        const instance = new this();

        const app = express();
        const settings = new Settings();

        instance.attachErrorHandler(app);

        const host = await settings.get('network.host', 'localhost');
        const port = await settings.get('network.port', 4000);

        app.set('host', host);
        app.set('port', port);

        this.attachCORS(app, settings);
        app.use(helmet());

        app.use('/public', express.static(process.cwd() + '/build/public/'));

        attachHomeAPI({ app, settings });

        instance._express = app;

        return instance;
    }

    attachErrorHandler(app) {
        // catching async unhandled rejections
        process
            .on('unhandledRejection', err => {
                logger.error('Unhandled rejection', err);
            })
            .on('uncaughtException', err => {
                logger.error('Uncaught exception', err);
            });

        // catching normal unhandled exceptions
        app.use((err, req, res, next) => {
            logger.error('Unhandled exception', err);
            res.send('Nasty error'); // todo: explain here
        });
    }

    static attachCORS(app, settings) {
        const parameters = {
            origin: (origin, cb) => {
                // allow requests with no origin, like mobile apps or curl requests
                if (!origin) {
                    return cb(null, true);
                }

                // get cors settings on each hit, to be able to change it at the run-time
                settings
                    .get('network.cors', null)
                    .then(corsSettings => {
                        const origins = _.isne(corsSettings)
                            ? corsSettings.split(',').map(x => x.trim())
                            : [];

                        let match = false;
                        if (_.iane(origins)) {
                            // we have CORS settings
                            match = origins.indexOf(origin) >= 0;
                        }

                        if (match) {
                            return cb(null, true);
                        } else {
                            return cb(new Error('CORS mismatch'), false); // todo: throw 403
                        }
                    })
                    .catch(error => {
                        logger.error(
                            'Error occurred when checking CORS',
                            error,
                        );
                        return cb(new Error('CORS error'), false); // todo: throw 500
                    });
            },
        };

        app.use(cors(parameters));
    }

    async listen() {
        const port = this._express.get('port');
        const host = this._express.get('host');

        return new Promise(resolve => {
            this._server = this._express.listen({ port }, () => {
                logger.info(
                    `🚀 Front server is ready at http://${host}:${port}`,
                    !__TEST__,
                );
                resolve();
            });
        });
    }

    async launch() {
        await this.listen();
    }

    async shutdown() {
        if (this._server) {
            return new Promise(resolve => {
                this._server.close(resolve);
            });
        }
    }

    getExpress() {
        return this._express;
    }
}
