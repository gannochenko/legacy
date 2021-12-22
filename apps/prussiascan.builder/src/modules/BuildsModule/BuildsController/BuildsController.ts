import { Controller, Post } from '@nestjs/common';
import { BuildsService } from '../BuildsService';
// import { CreateBuildDto } from './BuildsDTO';
import { Roles } from '../../../utils/Roles';
import { UserRoleEnum } from '../../../entities';

@Controller('builds')
export class BuildsController {
    constructor(private readonly authorsService: BuildsService) {}

    // todo: filter outgoing data
    @Post('create')
    // @Header('Cache-Control', 'none')
    // @HttpCode(204)
    @Roles(UserRoleEnum.cicd)
    async create() {
        return {
            data: await this.authorsService.create(),
        };
    }
}
