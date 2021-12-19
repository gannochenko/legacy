import { Module } from '@nestjs/common';
import { BuildsController } from './BuildsController';
import { BuildsService } from './BuildsService';

@Module({
    controllers: [BuildsController],
    providers: [BuildsService],
    exports: [BuildsService],
})
export class BuildsModule {}
