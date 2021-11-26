export enum HeritageObjectConditionEnum {
    excellent = 1,
    good = 2,
    acceptable = 3,
    poor = 4,
    partialRuin = 5,
    ruin = 6,
    // lost = 7,
}

export const heritageObjectConditionMap = {
    [HeritageObjectConditionEnum.excellent]: 'Состояние идеальное',
    [HeritageObjectConditionEnum.good]: 'Состояние хорошее',
    [HeritageObjectConditionEnum.acceptable]: 'Состояние удовлетворительное',
    [HeritageObjectConditionEnum.poor]: 'Состояние плохое',
    [HeritageObjectConditionEnum.partialRuin]: 'Частично руинирован',
    [HeritageObjectConditionEnum.ruin]: 'Руины',
};
