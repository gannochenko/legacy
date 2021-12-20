import * as fs from 'fs/promises';
import debug from 'debug';

const d = debug('app.maybeCreateBuildFolder');

export const isObjectExists = async (folder: string) => {
    let exists = false;
    try {
        const stats = await fs.stat(folder);
        exists = !!stats;
    } catch (error) {}

    return exists;
};

export const maybeCreateFolder = async (folder: string) => {
    if (!(await isObjectExists(folder))) {
        d('Create build folder');
        await fs.mkdir(folder, { recursive: true });
    }
};
