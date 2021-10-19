import {
    Controller,
    Post,
    Req,
    Body,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
    Query,
} from '@nestjs/common';
import { fromBuffer } from 'file-type';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { UploadObjectPhotoDto } from './ObjectPhotosDTO';
import { Roles } from '../../../utils/Roles';
import { ObjectPhotosService } from '../ObjectPhotosService';
import { UserRoleEnum } from '../../../entities/UserEntity/enums';

@Controller('object-photos')
export class ObjectPhotosController {
    constructor(private readonly objectPhotosService: ObjectPhotosService) {}

    @Post('upload')
    // @UseInterceptors(FileInterceptor('file'))
    @Roles(UserRoleEnum.contributor)
    async upload(
        // @Body() data: UploadObjectPhotoDto,
        // @UploadedFile() file: Express.Multer.File,
        @Query() { objectid }: Record<string, string>,
        @Body() file: Buffer,
    ) {
        console.log(objectid);

        console.log('F');
        console.log(file);
        if (!file) {
            throw new BadRequestException('File not sent');
        }

        let mime = '';
        const typeResult = await fromBuffer(file);
        if (typeResult) {
            mime = typeResult.mime;
        }

        if (mime !== 'image/jpeg' && mime !== 'image/png') {
            throw new BadRequestException('Only JPEG and PNG is allowed');
        }
        // if (size > 1024 * 1024 * 3) {
        //     throw new BadRequestException(
        //         'File size should not be greater than 3mb',
        //     );
        // }

        // await this.objectPhotosService.store(data, file);
        await this.objectPhotosService.store(
            {
                objectId: objectid,
            },
            file,
        );

        return { data: {}, aux: {} };
    }
}
