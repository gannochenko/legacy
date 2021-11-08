import { HTMLAttributes } from 'react';
import { ContentRecordType } from '../../type';

export type BlogDetailPropsType = {
    // custom props here

    data: {
        mdx: ContentRecordType;
    };
    path: string;
} & HTMLAttributes<HTMLElement>;
