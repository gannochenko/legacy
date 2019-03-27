import { wrapError } from 'ew-internals';
import fs from 'fs';

export default ({ app, settings }) => {
    app.get(
        '*',
        wrapError(async (req, res) => {
            const data = await new Promise((resolve, reject) => {
                fs.readFile(
                    `${process.cwd()}/build/index.html`,
                    (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    },
                );
            });

            res.status(200)
                .header('Content-Type', 'text/html')
                .send(data);
        }),
    );
};
