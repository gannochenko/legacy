import { Module } from '@nestjs/common';
import { InvitationController } from './InvitationController';
import { InvitationService } from './InvitationService';
import { UserService } from './UserService';
import { OptionsModule } from '../OptionsModule';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        OptionsModule,
        JwtModule.register({ secret: process.env.JWT_SECRET }),
    ],
    controllers: [InvitationController],
    providers: [InvitationService, UserService],
    exports: [InvitationService],
})
export class InvitationModule {}
