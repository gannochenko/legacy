import { HeritageObjectDetailType } from '../type';
import { normalizeHeritageObject } from '../../../../services/HeritageObject/normalize';
import { HeritageObjectType } from '../../../../services/HeritageObject/type';

export const useCombinedData = (
    currentData?: HeritageObjectDetailType,
    newData?: HeritageObjectType,
) => {
    if (!newData) {
        return currentData;
    }

    const normalNewData = normalizeHeritageObject(
        newData,
    ) as HeritageObjectType;

    // todo:
    // добавить сюда previewImage если он совпадает
    // добавить сюда headerImage если он совпадает
    // добавить все images с preview + те, что без preview

    console.log('new data');
    console.log(newData);
    console.log('normal new data');
    console.log(normalNewData);
    console.log('current data');
    console.log(currentData);

    return {};
};
