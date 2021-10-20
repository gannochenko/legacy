import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { RolesGuard } from '../guards/RolesGuard';
import { ObjectsModule } from './ObjectsModule';
import { APIKeyAuthenticationMiddleware } from '../middlewares/APIKeyAuthenticationMiddleware';

@Module({
    imports: [ObjectsModule],
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
            .apply(APIKeyAuthenticationMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.POST });
    }
}
