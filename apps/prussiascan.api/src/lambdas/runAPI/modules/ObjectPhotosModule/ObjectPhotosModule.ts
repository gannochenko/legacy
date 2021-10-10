import { Module } from '@nestjs/common';
import { ObjectPhotosController } from './ObjectPhotosController';
import { ObjectPhotosService } from './ObjectPhotosService';
import { ObjectsModule } from '../ObjectsModule';

@Module({
    controllers: [ObjectPhotosController],
    providers: [ObjectPhotosService],
    imports: [ObjectsModule],
})
export class ObjectPhotosModule {}
