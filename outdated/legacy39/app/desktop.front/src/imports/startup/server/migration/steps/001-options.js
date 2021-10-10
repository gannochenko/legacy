import Migration from '../../../../lib/base/migration';
import Option from '../../../../api/option/entity/entity.server.js';

export default new (class extends Migration {
    getVersion()
    {
        return 1;
    }

    getName()
    {
        return 'Some default options for both applications';
    }

    up()
    {
        const projectName = 'Прусское наследие';

        Option.set('application.title', projectName, {
            appId: 'admin',
            public: true,
        });
        Option.set('application.front-app.url', 'https://legacy.gannochenko.ru', {
            appId: 'admin',
            public: true,
        });

        Option.set('application.title', 'Прусское наследие', {
            appId: 'app',
            public: true,
        });
        Option.set('application.description', 'Прусское наследие', {
            appId: 'app',
            public: true,
        });
        Option.set('application.keywords', [
            'прусское наследие',
            'реестр',
            'окн'
        ], {
            appId: 'app',
            public: true,
        });

        Option.set('vendor.google.map.key', 'xxxxxxxxxxx', {
            public: true,
        });

	    Option.set('file.uploader.folder', '/home/sergei/images/', {
		    public: false,
	    });
	    Option.set('file.uploader.key', 'XXXXXXXXXXXXXXXXXXXX', {
		    public: false,
	    });
	    Option.set('file.cdn.1', 'http://localhost:3200', {
		    public: true,
	    });
    }
})();
