import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ObjectsController } from '../rest/controllers/ObjectsController';
import { RolesGuard } from '../guards/RolesGuard';
import { ObjectsService } from '../services/ObjectsService';

@Module({
    imports: [
    ],
    controllers: [ObjectsController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },

        // rest services
        ObjectsService,
    ],
})
export class ApplicationModule {}
