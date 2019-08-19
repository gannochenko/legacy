import { VaultRecord } from './type';

const vault = new Map<any, VaultRecord>();

export const getVaultFor = (key: any): VaultRecord => {
    if (!vault.has(key)) {
        vault.set(key, {});
    }

    return vault.get(key) as VaultRecord;
};

export const hasVaultFor = (obj: any): boolean => vault.has(obj);

export const getVault = () => vault;
