import * as fs from 'fs/promises';
import debug from 'debug';

const d = debug('app.maybeCreateBuildFolder');

export const maybeCreateBuildFolder = async () => {
    const buildFolderPath = process.env.BUILDER_FOLDER;
    if (!buildFolderPath) {
        throw new Error('Builder folder path is not defined');
    }

    let exists = false;
    try {
        const stats = await fs.stat(buildFolderPath);
        exists = !!stats;
    } catch (error) {}

    if (!exists) {
        d('Create build folder');
        await fs.mkdir(buildFolderPath, { recursive: true });
    }

    return buildFolderPath;
};
