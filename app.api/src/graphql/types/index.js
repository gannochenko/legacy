import { mergeTypes } from 'merge-graphql-schemas';

import someType from './sample.graphql';

export default mergeTypes(
    [
        someType,
    ],
    {all: true}
);
