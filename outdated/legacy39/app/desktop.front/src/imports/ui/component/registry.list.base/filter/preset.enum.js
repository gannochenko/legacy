import Enum from '../../../../lib/base/enum';
import User from '../../../../api/user/entity/entity.client.js';
import statusEnum from '../../../../api/registry.object/enum/status.js';
import categoryEnum from '../../../../api/registry.object/enum/category.js';
import conditionEnum from '../../../../api/registry.object/enum/condition.js';
import kindEnum from '../../../../api/registry.object/enum/kind.js';

export default new Enum([
    {key: 'ACTUAL', value: 'Актуальные', filter: {
        category: {$in: [categoryEnum.KEY_OKN, categoryEnum.KEY_ARCHITECT]},
        condition: {$nin: [conditionEnum.KEY_L]},
        kind: {$nin: [kindEnum.KEY_AREA,]},
    }},
    // {key: 'ONGOING', value: 'В работе', filter: () => {
    //     return {
    //         _id: {$in: User.get().getObjectOnGoing()},
    //     };
    // }},
    {key: 'DANGER', value: 'В опасности', filter: {inDanger: true}, needEditor: true},
    {key: 'FAVOURITE', value: 'В избранном', filter: () => {
        return {
            favouriteFor: {
                $exists: true,
                $ne: [],
                $in: [User.get().getId()],
            },
        };
    }, authorized: true},
    {key: 'REMARKABLE', value: 'Выдающиеся', filter: {remarkable: true}},
    {key: 'UNSHIELDED', value: 'Не ОКН', filter: {
        $or: [
            {status: {$exists: false}},
            {status: {$in: [statusEnum.KEY_NON]}},
        ],
        category: {$in: [categoryEnum.KEY_OKN, categoryEnum.KEY_ARCHITECT]},
        condition: {$nin: [conditionEnum.KEY_L]},
        kind: {$nin: [kindEnum.KEY_CEMETERY, kindEnum.KEY_AREA, kindEnum.KEY_PMEMORIAL]},
    }},
    {key: 'ALL', value: 'Вce', filter: {}},
]);
