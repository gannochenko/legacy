import { Module } from '@nestjs/common';
import { ObjectsController } from './ObjectsController';
import { ObjectsService } from './ObjectsService';
import { ObjectUploadsService } from './ObjectUploadsService';
import { OptionsModule } from '../OptionsModule';

@Module({
    imports: [OptionsModule],
    controllers: [ObjectsController],
    providers: [ObjectsService, ObjectUploadsService],
    exports: [ObjectsService],
})
export class ObjectsModule {}
