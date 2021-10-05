import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadObjectPhotoDto } from './ObjectPhotosDTO';
import { Roles } from '../../../utils/Roles';
import { ObjectPhotosService } from '../ObjectPhotosService';

@Controller('object-photos')
export class ObjectPhotosController {
    constructor(private readonly objectPhotosService: ObjectPhotosService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    // @Roles('admin')
    async upload(
        @Body() data: UploadObjectPhotoDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        if (!file) {
            throw new BadRequestException('File not sent');
        }
        const { mimetype, size } = file;
        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
            throw new BadRequestException('Only JPEG and PNG is allowed');
        }
        if (size > 1024 * 1024 * 3) {
            throw new BadRequestException(
                'File size should not be greater than 3mb',
            );
        }

        await this.objectPhotosService.store(data, file);

        return { data: {}, aux: {} };
    }
}
