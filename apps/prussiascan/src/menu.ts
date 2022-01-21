import { fillTemplate, HERITAGE_LIST, ABOUT, CONTACTS } from './pathTemplates';

type MenuItemsType = {
    text: string;
    link: string;
}[];

export const menu: MenuItemsType = [
    {
        text: 'Объекты',
        link: `${fillTemplate(HERITAGE_LIST, { kind: 'actual' })}`,
    },
    { text: 'О проекте', link: ABOUT },
    { text: 'Контакты', link: CONTACTS },
];
