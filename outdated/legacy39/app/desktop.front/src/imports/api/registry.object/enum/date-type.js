import Enum from './base.js';

class DateTypeEnum extends Enum {
    constructor() {
        super([
            {key: 'DATE', value: 'Точная дата',},
            {key: 'YEAR', value: 'Год',},
            {key: 'INTERVAL', value: 'Интервал',},
            {key: 'AGE', value: 'Столетие',},
        ]);
    }
}

export default new DateTypeEnum();
