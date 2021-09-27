import React from 'react';
import EntityForm from '../../../../component/general/entity-form';
import UserGroupEntity from '../../../../../api/user.group/entity/entity.client.js';

export default class UserGroupForm extends EntityForm
{
    static getEntity()
    {
        return UserGroupEntity;
    }

    extractItemTitle(item)
    {
        return item.getData().name || '';
    }
}
