import { Injectable } from '@nestjs/common';
import debug from 'debug';
import { join } from 'path';
import { tryExecute } from '../../utils/tryExecute';
import { maybeCreateFolder } from '../../utils/fs';
import { cloneOrPull, getRepositoryName } from '../../utils/git';
import { yarnBuild, yarnInstall } from '../../utils/yarn';

const d = debug('app.BuildsService');

@Injectable()
export class BuildsService {
    async create() {
        return tryExecute(async () => {
            const buildFolderPath = process.env.BUILDER_FOLDER;
            if (!buildFolderPath) {
                throw new Error('Builder folder path is not defined');
            }
            const repository = process.env.REPOSITORY ?? '';
            if (!repository) {
                throw new Error('Repository not defined');
            }
            const subFolder = process.env.SUBFOLDER ?? '';

            await maybeCreateFolder(buildFolderPath);
            await cloneOrPull(repository, buildFolderPath);

            const projectPath = join(
                buildFolderPath,
                getRepositoryName(repository),
                subFolder,
            );
            await yarnInstall(projectPath);
            await yarnBuild(projectPath);

            d('Finished');

            return null;
        });
    }

    async wipe() {
        return tryExecute(async () => {
            return 1;
        });
    }

    async schedule() {
        return tryExecute(async () => {
            return 1;
        });
    }
}
