import Rest from '../../../lib/util/uploader/rest.js';

import File from '../entity/entity.server.js';
import Result from '../../../lib/base/result/index.js';
import Option from '../../../api/option/entity/entity.server.js';

export default class UploaderRest extends Rest
{
    async checkAccess(form)
    {
        const result = new Result();
        
        const token = _.getValue(form, 'fields.token');
        if (!_.isStringNotEmpty(token))
        {
            result.addError('No token provided');
        }

        if (token !== Option.getValueOne('file.uploader.key'))
        {
	        result.addError('Access denied');
        }

        return result;
    }

    async postProcessFile(struct)
    {
        const result = new Result();

        const res = File.save(null, struct);
        if (res.isSuccess())
        {
            result.setData({_id: res.getId()});
        }
        else
        {
            result.setErrors(res.getErrors());
        }

        return result;
    }
}
