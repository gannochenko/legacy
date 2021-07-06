import os from 'os';
import xlsx from 'node-xlsx';
import Net from '../../../../lib/util/net.js';

export default class Grabber
{
    constructor()
    {
        this.url = '';
    }

    getUrl()
    {
        return 'https://gov39.ru/vlast/sluzhby/gookn/zip/svodnyy_perechen_okn.xlsx';
    }

    async get()
    {
        const saveTo = `${os.tmpdir()}/okn.xlsx`;

        await Net.getFile(this.getUrl(), saveTo);
        const list = xlsx.parse(saveTo);
        if (_.isArrayNotEmpty(list))
        {
            const sheet = list[0];
            if (_.isObjectNotEmpty(sheet) && _.isArrayNotEmpty(sheet.data))
            {
                return sheet.data.map((item) => {
                    if (!item.length || !item[0] || !_.isStringNotEmpty(item[0].toString()))
                    {
                        return null;
                    }

                    if (item.length === 1)
                    {
                        // it is a header
                        return {
                            header: this.prepareStr(item[0]),
                        };
                    }

                    return {
                        code: this.prepareStr(item[1]),
                        name: this.prepareStr(item[2]),
                        creationPeriod: this.prepareStr(item[3]),
                        locationDescription: this.prepareStr(item[4]),
                        document: this.prepareStr(item[5]),
                    };
                }).filter(x => !!x);
            }
        }

        throw new Error(); // reject =/
    }

    prepareStr(value)
    {
        if (typeof value === 'undefined' || value === null)
        {
            return '';
        }

        return value.toString().trim();
    }
}
