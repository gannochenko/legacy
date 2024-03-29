import {
    Controller,
    Post,
    Param,
    Body,
    Query,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ObjectsService } from '../ObjectsService';
import {
    AttachFileDto,
    CreateObjectDto,
    FindObjectDto,
    // UpdateObjectDto,
    GetUploadURLDto,
} from './ObjectsDTO';
import { Roles } from '../../../utils/Roles';
import { UserRoleEnum } from '../../../entities';
import { ObjectUploadsService } from '../ObjectUploadsService';

@Controller('objects')
export class ObjectsController {
    constructor(
        private readonly objectsService: ObjectsService,
        private readonly objectUploadsService: ObjectUploadsService,
    ) {}

    @Post('create')
    @Roles(UserRoleEnum.contributor)
    async create(@Body() data: CreateObjectDto) {
        return this.objectsService.create(data);
    }

    @Post('findall')
    @Roles(UserRoleEnum.contributor, UserRoleEnum.cicd)
    async findAll(@Query() { limit, lastId }: FindObjectDto) {
        return this.objectsService.findAll({
            limit,
            lastId,
        });
    }

    @Post('find/:id')
    @Roles(UserRoleEnum.contributor, UserRoleEnum.cicd)
    async findOne(@Param('id') id: string) {
        const result = await this.objectsService.getById(id);
        if (!result.data) {
            // https://docs.nestjs.com/exception-filters
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        return result;
    }

    @Post('getuploadurl')
    @Roles(UserRoleEnum.contributor)
    async getSignedUploadURL(@Body() data: GetUploadURLDto) {
        return this.objectUploadsService.getSignedUploadURL(data);
    }

    @Post('attachfile')
    @Roles(UserRoleEnum.contributor)
    async attachFile(@Body() data: AttachFileDto) {
        return this.objectUploadsService.attachFile(data);
    }
}
