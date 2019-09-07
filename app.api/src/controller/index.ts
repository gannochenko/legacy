import { HomeController } from './home/home';
import { SchemaController } from './schema/schema';
import { SyncController } from './sync/sync';
import { HealthController } from './health/health';

export default [
    SyncController,
    HomeController,
    SchemaController,
    HealthController,
];
