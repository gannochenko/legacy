import { mergeTypes } from 'merge-graphql-schemas';

import someType from './sample-b.graphql';

export default mergeTypes(
    [
        someType,
    ],
    {all: true}
);
