import React from 'react';
import EntityForm from '../../../../component/general/entity-form';
import UserEntity from '../../../../../api/user/entity/entity.client.js';

import Map from '../../../../../lib/base/map';
import Attribute from '../../../../../lib/base/map/attribute';

export default class UserForm extends EntityForm
{
    static getEntity()
    {
        return UserEntity;
    }

    extractItemTitle(item)
    {
        return item.getData().name || '';
    }

    transformMap(map)
    {
        map.removeAttribute('createdAt');
        map.insertAttributeAfter('emails', 'profile');

        map.getAttribute('emails').getType()[0].getAttribute('verified').setParameter('show-label', false);

        map.insertAttributeAfter(new Attribute({
            code: 'updatePassword',
            type: new Map([
                {
                    code: 'newPassword',
                    type: String,
                    optional: true,
                },
                {
                    code: 'newPasswordRepeat',
                    type: String,
                    custom()
                    {
                        const pass = this.field('updatePassword.newPassword').value;
                        const passRepeat = this.field('updatePassword.newPasswordRepeat').value;
                        
                        if (_.isStringNotEmpty(pass) && pass !== passRepeat) {
                            return 'passwordsDoNotMatch';
                        }
                        return null;
                    },
                    optional: true,
                },
            ]),
        }), 'profile');

        return map;
    }

    transformModelBack(model)
    {
        if (_.isObjectNotEmpty(model.updatePassword) && _.isStringNotEmpty(model.updatePassword.newPassword))
        {
            model.password = model.updatePassword.newPassword;
        }
        delete(model.updatePassword);

        return model;
    }
}
