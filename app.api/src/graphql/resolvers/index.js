import { mergeResolvers } from 'merge-graphql-schemas';

import sampleResolver from './sample';

export default mergeResolvers(
    [
        sampleResolver,
    ],
);
