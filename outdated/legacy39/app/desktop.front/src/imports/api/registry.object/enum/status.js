import Enum from './base.js';

class StatusEnum extends Enum {
    constructor() {
        super([
            {key: 'CLO', value: 'ОКН', iKey: ''},
            {key: 'PRE_CLO', value: 'Выявленный', iKey: [
                'VIYAVLENNIE OBEKTI KULTURNOGO NASLEDIYA',
                'VIYAVLENNIE OBEKTI ARHEOLOGICHESKOGO NASLEDIYA',
            ]},
            {key: 'POTENTIAL_CLO', value: 'С признаками', iKey: 'OBEKTI OBLADAYUSCHIE PRIZNAKAMI OBEKTA KULTURNOGO NASLEDIYA'},
            {key: 'NON', value: 'Без защиты', iKey: ''},
            {key: 'REJECT', value: 'Отказ', iKey: 'OTKAZ VO VKLYUCHENII V REESTR'},
        ]);
    }
}

export default new StatusEnum();
