import { HashStringToAny } from './type';

const vault = new Map();

export const getVaultFor = (obj: any): HashStringToAny => {
    if (!vault[obj]) {
        vault[obj] = {};
    }

    return vault[obj];
};

export const hasVaultFor = (obj: any): boolean => !!vault[obj];

export const getVault = () => vault;
