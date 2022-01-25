import { Controller, Post, Body } from '@nestjs/common';
import { InvitationService } from '../InvitationService';
import { InviteDto, JoinDto } from './InvitationDTO';
import { Roles } from '../../../utils/Roles';
import { UserRoleEnum } from '../../../entities';

@Controller()
export class InvitationController {
    constructor(private readonly service: InvitationService) {}

    @Post('invite')
    @Roles(UserRoleEnum.admin)
    async invite(@Body() data: InviteDto) {
        return this.service.invite(data);
    }

    @Post('join')
    async join(@Body() data: JoinDto) {
        return this.service.join(data);
    }
}
