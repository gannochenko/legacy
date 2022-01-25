import { Module } from '@nestjs/common';
import { InvitationController } from './InvitationController';
import { InvitationService } from './InvitationService';
import { OptionsModule } from '../OptionsModule';

@Module({
    imports: [OptionsModule],
    controllers: [InvitationController],
    providers: [InvitationService],
    exports: [InvitationService],
})
export class InvitationModule {}
