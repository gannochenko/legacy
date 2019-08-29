import { EntitySchema } from 'typeorm';
import { HomeController } from './home/home';
import { SchemaController } from './schema/schema';
import { SyncController } from './sync/sync';
import { HealthController } from './health/health';

// converting to EntitySchema[], because typescript does not work with decorators well enough so far
export default ([
    SyncController,
    HomeController,
    SchemaController,
    HealthController,
] as unknown[]) as EntitySchema[];
