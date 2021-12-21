import { Injectable } from '@nestjs/common';
import debug from 'debug';
import { tryExecute } from '../../utils/tryExecute';
import { maybeCreateFolder } from '../../utils/fs';
import { cloneOrPull } from '../../utils/git';

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

            await maybeCreateFolder(buildFolderPath);
            await cloneOrPull(repository, buildFolderPath);

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
