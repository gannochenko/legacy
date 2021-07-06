import Gov39Grabber from './grabber/gov39/index.js';
import areaEnum from '../../api/registry.object/enum/area.js';
import levelEnum from '../../api/registry.object/enum/level.js';
import statusEnum from '../../api/registry.object/enum/status.js';
import categoryEnum from '../../api/registry.object/enum/category.js';
import latinize from 'latinize';
import RegistryObject from '../../api/registry.object/entity/entity.server.js';

export default class RegistryUpdater
{
    async execute()
    {
        const grabber = new Gov39Grabber();
        const data = await grabber.get();

        const defStatus = statusEnum.KEY_CLO;

        let iKey = undefined;
        let area = undefined;
        let level = undefined;
        let status = defStatus;
        let category = undefined;

        const debug = false;

        // todo: temporal
        RegistryObject.getCollectionInstance().truncate();

        data.forEach((item) => {
            if (item.header)
            {
                debug && console.dir('H: '+item.header);
                iKey = this.normalizeKey(item.header);

                // try status
                item = statusEnum.getKeyRegular(iKey);
                if (item)
                {
                    debug && console.dir('Status goes to '+item.key);
                    status = item.key;

                    level = undefined;
                    category = undefined;
                    area = undefined;
                }

                item = levelEnum.getKeyRegular(iKey);
                if (item)
                {
                    debug && console.dir('Level goes to '+item.key);
                    level = item.key;

                    category = undefined;
                    area = undefined;
                }

                item = categoryEnum.getKeyRegular(iKey);
                if (item)
                {
                    debug && console.dir('Category goes to '+item.key);
                    category = item.key;

                    area = undefined;
                }

                item = areaEnum.getKeyRegular(iKey);
                if (item)
                {
                    debug && console.dir('Area goes to '+item.key);
                    area = item.key;
                }
            }
            else
            {
                item.status = status;
                item.level = level;
                item.category = category;
                item.area = area;

                const date = this.extractDate(item.document);
                if (_.isDate(date))
                {
                    item.originDate = date;
                }

                const eItem = new RegistryObject(item);
                item.search = eItem.getSearchIndex();
                // console.dir(`${item.name} > ${status} ${level} ${category} ${area}`);

                RegistryObject.save(null, item);
            }
        });
    }

    normalizeKey(str)
    {
        // Ё,ё => е
        return latinize(str.replace(/[\u0451\u0401]/gi, '\u0435').replace(/\s+/g, ' ')).toUpperCase().replace(/[^a-z0-9\s]+/ig, '');
    }

    extractDate(docName)
    {
        if (_.isStringNotEmpty(docName))
        {
            // search for "от 21.01.1900"
            const matches = docName.match(/\u043E\u0442 (\d+)\.(\d+)\.(\d+)/);
            if (_.isObjectNotEmpty(matches) && _.isStringNotEmpty(matches[3]))
            {
                const day = matches[1];
                const month = matches[2];
                const year = matches[3];

                if (_.isStringNotEmpty(day) || _.isStringNotEmpty(month) || _.isStringNotEmpty(year))
                {
                    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
                }
            }
        }

        return null;
    }
}
