import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ObjectsController } from '../rest/ObjectsController';
import { ObjectPhotosController } from '../rest/ObjectPhotosController';

import { RolesGuard } from '../guards/RolesGuard';
import { ObjectsService } from '../services/ObjectsService';
import { ObjectPhotosService } from '../services/ObjectPhotosService';

@Module({
    imports: [],
    controllers: [ObjectsController, ObjectPhotosController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        ObjectsService,
        ObjectPhotosService,
    ],
})
export class ApplicationModule {}
