import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RouteInfo } from '@nestjs/common/interfaces';

import { RolesGuard } from '../guards/RolesGuard';
import { ObjectsModule } from './ObjectsModule';
import { ObjectPhotosModule } from './ObjectPhotosModule';
import { APIKeyAuthenticationMiddleware } from '../middlewares/APIKeyAuthenticationMiddleware';
import { RawBodyMiddleware } from '../middlewares/RawBodyMiddleware';
import { JsonBodyMiddleware } from '../middlewares/JsonBodyMiddleware';

const rawBodyParsingRoutes: Array<RouteInfo> = [
    {
        path: '/object-photos/upload',
        method: RequestMethod.POST,
    },
];

@Module({
    imports: [ObjectsModule, ObjectPhotosModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class ApplicationModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RawBodyMiddleware)
            .forRoutes(...rawBodyParsingRoutes)
            .apply(JsonBodyMiddleware)
            .exclude(...rawBodyParsingRoutes)
            .forRoutes('*')
            .apply(APIKeyAuthenticationMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.POST });
    }
}
