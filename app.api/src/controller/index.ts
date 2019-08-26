import { EntitySchema } from 'typeorm';
import { SchemaController } from './schema';

// converting to EntitySchema[], because typescript does not work with decorators well enough so far
export default ([SchemaController] as unknown) as EntitySchema[];
