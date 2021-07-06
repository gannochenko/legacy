import BaseMethod from '../../api/file/method/method.js';

export default class Method extends BaseMethod
{
    static getBaseDeclaration(sp = null)
    {
        const declaration = _.intersectKeys(super.getBaseDeclaration(sp), {
            find: 1,
            getCount: 1,
            getUploaderToken: 1,
        });

        declaration.getUploaderToken.security =  {
	        needAuthorized: true,
        };

        return declaration;
    }
}
