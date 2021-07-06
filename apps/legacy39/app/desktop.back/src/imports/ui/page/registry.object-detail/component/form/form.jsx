import React from 'react';
import EntityForm from '../../../../component/general/entity-form/index.jsx';
import RegistryObject from '../../../../../api/registry.object/entity/entity.client.js';

export default class RegistryObjectForm extends EntityForm
{
    static getEntity()
    {
        return RegistryObject;
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
