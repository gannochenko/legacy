import {
    Controller,
    Post,
    Get,
    // Header,
    Patch,
    Param,
    // HttpCode,
    Body,
    Query,
    Delete,
    HttpException,
    HttpStatus,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectsService } from '../../services/ObjectsService';
import {
    CreateObjectPhotoDto,
    // UpdateObjectDto,
} from './ObjectPhotosDTO';
import { Roles } from '../../utils/Roles';
import { AsyncRESTResponse } from '../../type';

@Controller('object-photos')
export class ObjectPhotosController {
    constructor(private readonly objectsService: ObjectsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    // @Header('Cache-Control', 'none')
    // @HttpCode(204)
    // @Roles('admin')
    async create(
        @Body() data: CreateObjectPhotoDto,
        @UploadedFile() file: Express.Multer.File,
    ): AsyncRESTResponse<any> {
        console.log(data);
        console.log(file);
        return { data: {}, aux: {} };
        // return this.objectsService.create(data);
    }
}
