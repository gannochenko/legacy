import fs from 'fs';
import https from 'https';

export default class Util
{
    static async getFile(url, saveAs)
    {
        return new Promise((resolve, reject) => {
            const request = https.get(url, (response) => {
                if (response.statusCode.toString() !== '200')
                {
                    reject({message: `HTTP ${response.statusCode}`});// eslint-disable-line
                    return;
                }

                const stream = fs.createWriteStream(saveAs);

                response.on('end', () => {
                    stream.destroy();
                    resolve();
                });
                response.pipe(stream);
            });
            request.setTimeout(10000, () => {
                reject({message: 'Timeout'});// eslint-disable-line
            });
            request.on('error', (error) => {
                reject(error);
            });
        });
    }
}
