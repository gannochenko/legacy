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
import { ObjectsService } from '../ObjectsService';
import {
    CreateObjectDto,
    FindObjectDto,
    // UpdateObjectDto,
} from './ObjectsDTO';
import { Roles } from '../../../utils/Roles';

@Controller('objects')
export class ObjectsController {
    constructor(private readonly objectsService: ObjectsService) {}

    @Post()
    // @Header('Cache-Control', 'none')
    // @HttpCode(204)
    // @Roles('admin')
    async create(@Body() data: CreateObjectDto) {
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
    async findAll(@Query() { limit, lastId }: FindObjectDto) {
        return this.objectsService.findAll({
            limit,
            lastId,
        });
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const result = await this.objectsService.getById(id);
        if (!result.data) {
            // https://docs.nestjs.com/exception-filters
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        return result;
    }
}
