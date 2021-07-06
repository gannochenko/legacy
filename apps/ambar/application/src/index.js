import 'babel-polyfill';
import express from 'express';
import ejs from 'ejs';
import Util from './lib';
import process from 'process';

const app = express();

app.use('/public', express.static('public'));
app.use('/public', () => {
    throw new Error('404');
});

app.get('*', (req, res) => {
    const folder = _.isStringNotEmpty(process.env.ROOT_FOLDER) ? process.env.ROOT_FOLDER : __dirname;
    ejs.renderFile(`${folder}/content/index.ejs`, {
        isBrowser: Util.isBrowser(req.headers['user-agent']),
    }, {delimiter: '%'}, (err, content) => {
        if (err) {
            console.dir(err);
            res.status(500);
            res.send('A nasty, terrible error occurred.');
        } else {
            res.send(content);
        }
    });
});

app.listen(3000, () => {
    console.log('Listening on 3000');
});
