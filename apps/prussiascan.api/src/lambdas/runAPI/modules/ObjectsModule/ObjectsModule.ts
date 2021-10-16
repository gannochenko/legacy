import { Module } from '@nestjs/common';
import { ObjectsController } from './ObjectsController';
import { ObjectsService } from './ObjectsService';

@Module({
    controllers: [ObjectsController],
    providers: [ObjectsService],
    exports: [ObjectsService],
})
export class ObjectsModule {}
