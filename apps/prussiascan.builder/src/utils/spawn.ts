import debug from 'debug';
import { spawn as chSpawn } from 'child_process';

const d = debug('app.spawn');

export const spawn = async (cmd: string, args: string[], cwd?: string) => {
    d([cmd, ...args].join(' '));

    const proc = chSpawn(cmd, args, {
        cwd,
        stdio: ['inherit', 'inherit', 'inherit'],
    });

    return await new Promise((resolve, reject) => {
        proc.on('exit', (code) => {
            resolve(code);
        });

        proc.on('error', () => {
            reject();
        });
    });
};
