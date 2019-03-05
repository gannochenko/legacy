import { wrapError } from '../lib/util';
import axios from 'axios';
import ejs from 'ejs';

import template from '../template/index.html';

export default app => {
    app.get(
        '/',
        wrapError(async (req, res) => {
            const result = await axios.request({
                method: 'get',
                socketPath: '/var/run/docker.sock',
                url: '/containers/json',
            }).catch(() => null);

            let list = [];

            if (result === null) {
                return res.status(500).header('Content-Type', 'text/html').send(ejs.render(template, {
                    error: 'There is an error occurred while retrieving data from the socket',
                    services: list,
                }));
            }

            const data = result.data;
            if (_.iane(data)) {
                list = data.map(container => {

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

                    const name = labels['com.list.name'];
                    const code = labels['com.docker.compose.service'];
                    if (!_.isne(name) || !_.isne(code)) {
                        return null;
                    }

                    const links = [];
                    Object.keys(labels).forEach(label => {
                        if (label.startsWith('com.list.link.')) {
                            const [ description, url ] = labels[label].split('___');
                            links.push({
                                description,
                                url,
                            });
                        }
                    });

                    return {
                        code,
                        name,
                        description: labels['com.list.description'] || null,
                        port: publicBind.PublicPort,
                        links,
                        sort: labels['com.list.sort'] || null,
                    };
                }).filter(x => !!x);
            }

            list = _.sortBy(list, ['sort']);

            return res.status(200).header('Content-Type', 'text/html').send(ejs.render(template, {
                services: list,
                error: null,
            }));
        }),
    );
};
