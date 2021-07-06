import Enum from './base.js';

export default new Enum([
    {key: 'OKN', value: 'Объект культурного наследия', iKey: [
        'VIYAVLENNIE OBEKTI KULTURNOGO NASLEDIYA',
    ]},
    {key: 'ARCHEOLOGY', value: 'Объект археологического наследия', iKey: [
        'OBEKTI ARHEOLOGICHESKOGO NASLEDIYA',
        'VIYAVLENNIE OBEKTI ARHEOLOGICHESKOGO NASLEDIYA'
    ]},
    {key: 'ARCHITECT', value: 'Памятник архитектуры', iKey: 'PAMYATNIKI ARHITEKTURI'},
    {key: 'HIST', value: 'Памятник истории', iKey: 'PAMYATNIKI ISTORII'},
    {key: 'ART', value: 'Памятник искусства', iKey: 'PAMYATNIKI ISKUSSTVA'},
    {key: 'SCIENCE', value: 'Объект науки и техники', iKey: 'OBEKTI NAUKI I TEHNIKI'},
]);
