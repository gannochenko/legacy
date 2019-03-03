import { mergeResolvers } from 'merge-graphql-schemas';

import sampleResolver from './sample';
import personResolver from './person';

export default mergeResolvers([sampleResolver, personResolver]);
