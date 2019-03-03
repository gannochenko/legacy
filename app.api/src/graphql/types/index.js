import { mergeTypes } from 'merge-graphql-schemas';

import someType from './sample.graphql';
import Person from './person.graphql';

export default mergeTypes([someType, Person], { all: true });
