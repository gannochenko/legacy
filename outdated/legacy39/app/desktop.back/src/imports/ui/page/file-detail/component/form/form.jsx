import React from 'react';
import EntityForm from '../../../../component/general/entity-form';
import FileEntity from '../../../../../api/file/entity/entity.client.js';

export default class FileEntityForm extends EntityForm
{
    static getEntity()
    {
        return FileEntity;
    }

    extractItemTitle(item)
    {
        return item.getData().name || '';
    }

    // transformMap(map)
    // {
    //     if (this.isNewItem())
    //     {
    //         // will be a new file
    //         map.getAttribute('name').setOptional(true);
    //         map.insertAttributeAfter('path');
    //     }
    //
    //     return map;
    // }
}
