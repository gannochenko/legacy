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
} from '@nestjs/common';
import { ObjectsService } from '../../services/ObjectsService';
import {
    CreateObjectDto,
    FindObjectDto,
    // UpdateObjectDto,
} from './ObjectsDTO';
import { Roles } from '../../utils/Roles';
import { AsyncRESTResponse, AsyncRESTResponseList } from '../../type';
import { ObjectEntity } from '../../entities/ObjectEntity';

@Controller('objects')
export class ObjectsController {
    constructor(private readonly objectsService: ObjectsService) {}

    @Post()
    // @Header('Cache-Control', 'none')
    // @HttpCode(204)
    // @Roles('admin')
    async create(
        @Body() data: CreateObjectDto,
    ): AsyncRESTResponse<ObjectEntity> {
        return this.objectsService.create(data);
    }

    // @Patch(':id')
    // @Roles('admin')
    // async update(
    //     @Param('id') id: IDType,
    //     @Body() data: UpdateObjectDto,
    // ): AsyncRESTResponse<AuthorEntity> {
    //     if (!(await this.authorsService.isElementExists(id))) {
    //         // https://docs.nestjs.com/exception-filters
    //         throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    //     }
    //
    //     return createResponse(await this.authorsService.update(id, data));
    // }

    // @Delete(':id')
    // @Roles('admin')
    // async delete(@Param('id') id: IDType): AsyncRESTResponse<AuthorEntity> {
    //     if (!(await this.authorsService.isElementExists(id))) {
    //         // https://docs.nestjs.com/exception-filters
    //         throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    //     }
    //
    //     return createResponse(await this.authorsService.delete(id));
    // }

    @Get()
    async findAll(
        @Query() { limit, lastId }: FindObjectDto,
    ): AsyncRESTResponseList<ObjectEntity> {
        return this.objectsService.findAll({
            limit,
            lastId,
        });
    }

    @Get(':id')
    async findOne(@Param('id') id: string): AsyncRESTResponse<ObjectEntity> {
        const element = await this.objectsService.findOneById(id);
        if (!element) {
            // https://docs.nestjs.com/exception-filters
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        return element;
    }
}
