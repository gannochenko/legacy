import { DTOType, VaultRecord } from './type';
import { EntitySchema } from 'typeorm';

type VaultKey = EntitySchema | DTOType | Function;

const vault = new Map<VaultKey, VaultRecord>();

export const getVaultFor = (key: VaultKey): VaultRecord => {
    if (!vault.has(key)) {
        vault.set(key, {});
    }

    return vault.get(key) as VaultRecord;
};

export const hasVaultFor = (obj: VaultKey): boolean => vault.has(obj);

export const getVault = () => vault;
