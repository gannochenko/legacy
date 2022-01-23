import {
    Controller,
    Post,
    Param,
    Body,
    Query,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { GroupService } from '../GroupService';
import {
    CreateDto,
    FindDto,
    // UpdateDto,
} from './CoolDTO';
import { Roles } from '../../../utils/Roles';
import { UserRoleEnum } from '../../../entities';

@Controller('Group')
export class GroupController {
    constructor(
        private readonly service: GroupService,
    ) {}

    @Post('create')
    @Roles(UserRoleEnum.contributor)
    async create(@Body() data: CreateDto) {
        return this.service.create(data);
    }

    @Post('findall')
    @Roles(UserRoleEnum.contributor, UserRoleEnum.cicd)
    async findAll(@Query() { limit, lastId }: FindDto) {
        return this.service.findAll({
            limit,
            lastId,
        });
    }

    @Post('find/:id')
    @Roles(UserRoleEnum.contributor, UserRoleEnum.cicd)
    async findOne(@Param('id') id: string) {
        const result = await this.service.getById(id);
        if (!result.data) {
            // https://docs.nestjs.com/exception-filters
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        return result;
    }
}
