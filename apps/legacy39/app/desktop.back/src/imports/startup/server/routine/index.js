import Shell, {log} from '../../../lib/util/shell/shell.js';
import RegistryUpdater from '../../../lib-local/registry-updater/index.js';

import RegistryObjectImported from '../../../api/registry.object.imported/entity/entity.server.js';
import Raw from '../../../api/registry.object.imported/config/collection.raw.js';

import categoryEnum from '../../../api/registry.object.imported/enum/category.js';

// Shell.register('update-registry', 'Update registry', () => {
//     return (new RegistryUpdater()).execute();
// });

Shell.register('accept-imported', 'Accept imported', () => {
    const raw = Raw.findOne();

    if (raw) {

        const parseLocation = (coords) => {
            coords = coords.trim().split(',');

            return {
                lat: parseFloat(coords[1]),
                lng: parseFloat(coords[0]),
            };
        };

        const collection = RegistryObjectImported.getCollection();
        // await collection.truncate();

        // const ctx = collection.createBulkContext();
        // console.dir(ctx);

        const folders = _.getValue(raw, 'kml.Document.Folder');
        if (_.isArrayNotEmpty(folders)) {
            folders.forEach((f) => {
                const categoryName = f.name;
                const objects = f.Placemark;

                if (_.isArrayNotEmpty(objects)) {
                    objects.forEach((object) => {

                        const name = object.name;
                        const description = object.description || '';
                        const uid = `${name}|${description}`;

                        const location = [];
                        if (_.isObjectNotEmpty(object.Point)) {
                            location.push(parseLocation(object.Point.coordinates));
                        }

                        if (!_.isArrayNotEmpty(location)) {
                            return;
                        }

                        console.dir('Insert '+name);

                        collection.update({
                            uid,
                        }, {
                            $set: {
                                uid,
                                category: categoryEnum.getKey(categoryName),
                                name,
                                description,
                                extraData: object.ExtendedData || {},
                                location,
                            },
                        }, {
                            upsert: true,
                        });
                    });
                }
            });
        }

        //ctx.flush();
    }
});
