import cors from 'cors';
import { Express } from 'express';
import { Settings, logError } from '@bucket-of-bolts/util';
import _ from '@bucket-of-bolts/microdash';

const useCORS = (app: Express, settings: Settings) => {
    app.use(
        cors({
            // eslint-disable-next-line consistent-return
            origin: (origin, cb) => {
                // allow requests with no origin, like mobile apps or curl requests
                if (!origin) {
                    return cb(null, true);
                }

                // get cors settings on each hit, to be able to change it at the run-time
                settings
                    .get('network.cors', null)
                    .then((corsSettings: string) => {
                        if (corsSettings === '*') {
                            return cb(null, true);
                        }

                        const origins = _.isStringNotEmpty(corsSettings)
                            ? corsSettings.split(',').map(x => x.trim())
                            : [];

                        let match = false;
                        if (_.isArrayNotEmpty(origins)) {
                            // we have CORS settings
                            match = origins.indexOf(origin) >= 0;
                        }

                        if (match) {
                            return cb(null, true);
                        }

                        return cb(new Error('CORS mismatch'), false); // todo: throw 403
                    })
                    .catch((error: Error) => {
                        logError('Error occurred when checking CORS', error);
                        return cb(new Error('CORS error'), false); // todo: throw 500
                    });
            },
        }),
    );
};

export default useCORS;
