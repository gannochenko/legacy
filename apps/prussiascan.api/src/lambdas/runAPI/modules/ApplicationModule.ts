import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { RolesGuard } from '../guards/RolesGuard';
import { ObjectsModule } from './ObjectsModule';
import { OptionsModule } from './OptionsModule';
import {
    APIKeyAuthenticationMiddleware,
    JWTAuthenticationMiddleware,
} from '../middlewares';

@Module({
    imports: [ObjectsModule, OptionsModule],
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
            .forRoutes({ path: '*', method: RequestMethod.POST })
            .apply(JWTAuthenticationMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.POST });
    }
}
