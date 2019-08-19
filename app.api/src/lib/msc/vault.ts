const vault = new Map<any, MapStringToAny>();

export const getVaultFor = (key: any): MapStringToAny => {
    if (!vault.has(key)) {
        vault.set(key, {});
    }

    return vault.get(key) as MapStringToAny;
};

export const hasVaultFor = (obj: any): boolean => vault.has(obj);

export const getVault = () => vault;
