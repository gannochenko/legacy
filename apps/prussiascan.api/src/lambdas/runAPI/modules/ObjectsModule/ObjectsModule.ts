import { Module } from '@nestjs/common';
import { ObjectsController } from './ObjectsController';
import { ObjectsService } from './ObjectsService';
import { ObjectUploadsService } from './ObjectUploadsService';

@Module({
    controllers: [ObjectsController],
    providers: [ObjectsService, ObjectUploadsService],
    exports: [ObjectsService],
})
export class ObjectsModule {}
