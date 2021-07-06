import {WebApp} from 'meteor/webapp';

import UploaderRest from '../util/uploader-rest.js';
import StorageLocal from '../../../lib/util/uploader/storage/local/index.js';
import Option from '../../../api/option/entity/entity.server.js';

export default class Rest
{
    static declare(sp = null)
    {
        const rest = new UploaderRest({
            path: '/upload',
            storage: new StorageLocal({
                uploadFolder: Option.getValueOne('file.uploader.folder'),
            }),
        });

        rest.usedBy(WebApp.connectHandlers);
    }
}
