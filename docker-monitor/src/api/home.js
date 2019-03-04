import { wrapError } from '../lib/util';
import axios from 'axios';

export default app => {
    app.get(
        '/',
        wrapError(async (req, res) => {

            const result = await axios.request({
                method: 'get',
                socketPath: '/var/run/docker.sock',
                url: '/containers/json',
            });

            res.status(200).header('Content-Type', 'application/json').send(require('util').inspect(result.data, {depth: 10}));
        }),
    );
};
