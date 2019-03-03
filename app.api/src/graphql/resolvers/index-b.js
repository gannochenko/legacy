import { mergeResolvers } from 'merge-graphql-schemas';

import sampleResolver from './sample-b';

export default mergeResolvers(
    [
        sampleResolver,
    ],
);
