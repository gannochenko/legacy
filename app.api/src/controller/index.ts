import { EntitySchema } from 'typeorm';
import { HomeController } from './home/home';
import { SchemaController } from './schema/schema';
import { SyncController } from './sync/sync';

// converting to EntitySchema[], because typescript does not work with decorators well enough so far
export default ([
    SyncController,
    HomeController,
    SchemaController,
] as unknown[]) as EntitySchema[];
