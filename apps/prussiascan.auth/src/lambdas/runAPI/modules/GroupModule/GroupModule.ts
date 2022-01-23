import { Module } from '@nestjs/common';
import { CoolController } from './CoolController';
import { CoolService } from './CoolService';
import { OptionsModule } from '../OptionsModule';

@Module({
    imports: [OptionsModule],
    controllers: [CoolController],
    providers: [CoolService],
    exports: [CoolService],
})
export class GroupModule {}
