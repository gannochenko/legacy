// import {log} from '../../util/shell/shell.js';
import Side from './../../util/side.js';

Side.ensureOnServer();

/**
 * @abstract
 */
export default class BaseMigration
{
    getVersion()
    {
        throw new Error('Not implemented: getVersion()');
    }

    getName()
    {
        return 'New migration';
    }

    up()
    {
    }

    execute()
    {
        let failed = false;
        try
        {
            this.up();
        }
        catch(e)
        {
            failed = true;
            console.dir(e);
            // this.saveLogItem(Shell.console.getData(), e);
        }

        // if (!failed) {
        //     this.saveLogItem(Shell.console.getData());
        // }
    }

    // log()
    // {
    //     log.apply(this, arguments);
    // }

    transformItems(entity, parameters, action, dryRun = false, noValidation = false)
    {

	    if (!_.isFunction(action))
        {
	        console.dir(`Action is not a function for a transformation in "${this.getName()}" migration`);
            return;
        }

        if (dryRun)
        {
	        console.dir(`You are executing a transformation in the "${this.getName()}" migration in the dry run mode.`);
        }

	    entity.find(parameters, {asPlainObject: true}).forEach((item) => {
            const data = {};

	        action.apply(this, [item, data]);

            if (_.isObjectNotEmpty(data))
            {
                if (!dryRun)
                {
                    // this.log(`Update ${item._id}`);
                    try
                    {
	                    entity.getCollection().getMongoCollection().update({_id: item._id}, {$set: data}, {bypassCollection2: noValidation});
                    }
                    catch (e)
                    {
                        // this.log(`While updating ${item._id} we encountered a error:`);
                        // this.log(e);
                    }
                }
                else
                {
                    // this.log(data);
                }
            }
        });
    }
}
