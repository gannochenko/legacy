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

            const data = result.data;
            if (_.iane(data)) {
                const list = data.map(container => {

                    const ports = container.Ports;
                    if (!_.iane(ports)) {
                        return null;
                    }

                    const publicBind = ports.find(bind => bind.IP === '0.0.0.0' && !isNaN(parseInt(bind.PublicPort, 10)));
                    if (!publicBind) {
                        return null;
                    }

                    const labels = container.Labels;
                    if (!_.ione(labels)) {
                        return null;
                    }

                    const code = labels['com.docker.compose.service'];
                    if (!_.isne(code)) {
                        return null;
                    }

                    const links = [];
                    Object.keys(labels).forEach(label => {
                        if (label.startsWith('com.list.link.')) {
                            const [ description, url ] = labels[label].split(':');
                            links.push({
                                description,
                                url,
                            });
                        }
                    });

                    return {
                        code,
                        name: labels['com.list.name'] || null,
                        description: labels['com.list.description'] || null,
                        port: publicBind.PublicPort,
                        links,
                    };
                }).filter(x => !!x);

                console.log(require('util').inspect(list, {depth: 10}));
            }

            res.status(200).header('Content-Type', 'application/json').send(require('util').inspect(result.data, {depth: 10}));
        }),
    );
};
