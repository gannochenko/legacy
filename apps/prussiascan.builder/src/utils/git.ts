import debug from 'debug';
import { join } from 'path';
import { spawn } from './spawn';
import { isObjectExists } from './fs';

const d = debug('app.Git');

export const cloneOrPull = async (repository: string, folder: string) => {
    let code = '';
    const match = repository.match(/\/([a-zA-Z0-9_]+)\.git$/);
    if (match?.[1]) {
        code = match[1];
    }

    const repoFolder = join(folder, code);
    if (await isObjectExists(join(repoFolder, '.git'))) {
        d(`Pulling the repository in ${repoFolder}`);
        await spawn('git', ['pull', 'origin', 'master'], repoFolder);
    } else {
        d(`Cloning the repository to ${folder}`);
        await spawn(
            'git',
            [
                'clone',
                '-b',
                'master',
                '--single-branch',
                repository,
                code,
                '--depth',
                '1',
            ],
            folder,
        );
    }

    d('Done');
};
