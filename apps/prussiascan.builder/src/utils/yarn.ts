import debug from 'debug';
import { spawn } from './spawn';

const d = debug('app.Yarn');

export const yarnInstall = async (folder: string) => {
    d(`Install packages to ${folder}`);
    await spawn('yarn', [], folder);
};

export const yarnBuild = async (folder: string) => {
    d(`Building Gatsby in ${folder}`);
    await spawn('yarn', ['build'], folder);
};
