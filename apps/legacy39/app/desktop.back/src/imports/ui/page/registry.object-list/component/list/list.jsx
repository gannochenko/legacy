import React from 'react';
import List from '../../../../component/general/list/list.jsx';
import RegistryObject from '../../../../../api/registry.object/entity/entity.client.js'

export default class extends List
{
    static getEntity()
    {
        return RegistryObject;
    }

    getEntity()
    {
        return this.constructor.getEntity();
    }
}
