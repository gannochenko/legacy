import express from 'express';
import React from 'react';
import cors from 'cors';
import helmet from 'helmet';

import { Settings, logger } from 'ew-internals';

import { renderToString } from 'react-dom/server';
// import Application from "../common/Application";

const app = express();
const settings = new Settings();

if (!__DEV__) {
    process
        .on('unhandledRejection', err => {
            logger.error('Unhandled rejection', err);
        })
        .on('uncaughtException', err => {
            logger.error('Uncaught exception', err);
        });
}

// catching normal unhandled exceptions
app.use((err, req, res, next) => {
    logger.error('Unhandled exception', err);
    res.send(__DEV__ ? err.message : 'Nasty error');
});

app.set('port', 3000);

app.use(
    cors({
        origin: (origin, cb) => {
            // allow requests with no origin, like mobile apps or curl requests
            if (!origin || __DEV__) {
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
                    logger.error('Error occurred when checking CORS', error);
                    return cb(new Error('CORS error'), false); // todo: throw 500
                });
        },
    }),
);

app.use(helmet());
app.use(express.static(process.cwd() + '/public/'));

// todo: use renderer here
app.get('*', (req, res) => {
    // todo: ssr is not ready yet
    let application = ''; // renderToString(<Application />);

    let html = `<!doctype html>
    <html lang="">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>HMR all the things!</title>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
            <div id="root">${application}</div>
            <script src="http://localhost:3001/client.js"></script>
        </body>
    </html>`;

    res.send(html);
});

export default app;
