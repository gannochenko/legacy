import { HERITAGE_LIST, ABOUT, CONTACTS } from './pathTemplates';

type MenuItemsType = {
    text: string;
    link: string;
}[];

export const menu: MenuItemsType = [
    { text: 'Объекты', link: `${HERITAGE_LIST}/actual` },
    { text: 'О проекте', link: ABOUT },
    { text: 'Контакты', link: CONTACTS },
];
