import {
    BLOG_LIST,
    ABOUT,
    
    CONTACTS,
    
} from './pathTemplates';

type MenuItemsType = {
    text: string;
    link: string;
}[];

export const menu: MenuItemsType = [
    { text: 'blog', link: BLOG_LIST },
    { text: 'About', link: ABOUT },

    { text: 'Contacts', link: CONTACTS },

];
