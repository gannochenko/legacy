import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import debug from 'debug';
import { promisify } from 'util';
import { tryExecute } from '../../utils/tryExecute';
import { maybeCreateBuildFolder } from '../../utils/buildFolder';

const execAsync = promisify(exec);

const d = debug('app.BuildsService');

@Injectable()
export class BuildsService {
    async create() {
        return tryExecute(async () => {
            const buildFolderPath = await maybeCreateBuildFolder();
            const repository = process.env.REPOSITORY ?? '';
            if (!repository) {
                throw new Error('Repository not defined');
            }

            d(`Cloning to ${buildFolderPath}`);
            const { stdout, stderr } = await execAsync(
                `git clone ${repository} 111 --depth 1`,
                {
                    cwd: buildFolderPath,
                },
            );

            d('Cloned');

            console.log(stdout);
            console.log(stderr);

            // console.log(output);
            // const element = this.usersRepository.create(data);
            // return await this.usersRepository.save(element);
            return null;
        });
    }
}
