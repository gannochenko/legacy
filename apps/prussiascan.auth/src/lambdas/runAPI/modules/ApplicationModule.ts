import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { RolesGuard } from '../guards/RolesGuard';
import { InvitationModule } from './InvitationModule';
import { OptionsModule } from './OptionsModule';
import { APIKeyAuthenticationMiddleware } from '../middlewares/APIKeyAuthenticationMiddleware';

@Module({
    imports: [InvitationModule, OptionsModule],
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
