import formidable from 'formidable';
import Result from '../../base/result/index.js';

export default class Rest
{
    constructor(props)
    {
        this._props = props || {};
    }

    getProps()
    {
        return this._props;
    }

    getPath()
    {
        return this.getProps().path || '/upload';
    }

    getStorage()
    {
        return this.getProps().storage;
    }

    usedBy(app)
    {
        app.use(this.getPath(), async (req, res, next) => {
            let form;
            try
            {
                form = await this.parseForm(req);
            }
            catch(e)
            {
                this.send(res, 400, {
                    error: {
                        message: 'Illegal form received',
                    }
                });
                return;
            }
            
            const accessResult = await this.checkAccess(form);
            if (!accessResult.isSuccess())
            {
                this.send(res, 403, {
                    error: {
                        message: 'Access denied',
                    }
                });
                return;
            }

            const files = form.files;

            if (!_.isObjectNotEmpty(files) || !files.file)
            {
                this.send(res, 400, {
                    error: {
                        message: 'Illegal form received (no legal "file" field found)',
                    }
                });
                return;
            }

            const storage = this.getStorage();

            try
            {
                const struct = await storage.upload(files.file);

                const processResult = await this.postProcessFile(struct);
                if (!processResult.isSuccess())
                {
                    console.dir(processResult);

                    this.send(res, 500, {
                        error: {
                            message: processResult.getErrorFirst().message,
                        },
                    });
                    return;
                }

                this.send(res, 200, processResult.getData());
            }
            catch(e)
            {
                this.send(res, 500, {
                    error: {
	                    message: 'Unable to save file to the storage',
                    }
                });
            }
        });
    }

    async checkAccess(form)
    {
        return new Result();
    }

    async postProcessFile(struct)
    {
        return new Result();
    }

    async parseForm(req)
    {
        const form = new formidable.IncomingForm();

        return new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err)
                {
                    reject(err);
                }
                else
                {
                    resolve({fields, files});
                }
            });
        });
    }

    send(res, code = 200, data = {})
    {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(code);

        res.end(JSON.stringify(data));
    }
}
