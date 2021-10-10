import { NestMiddleware } from '@nestjs/common';
import { UserRoleEnum } from '../entities/UserEntity/enums';

export class APIKeyAuthenticationMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const key = req.headers['x-api-key'] || '';

        let roles: string[] = [];

        if (key === process.env.CONTRIBUTOR_API_KEY) {
            roles = [UserRoleEnum.contributor];
        }
        if (key === process.env.CICD_API_KEY) {
            roles = [UserRoleEnum.cicd];
        }

        if (roles.length) {
            req.user = {
                ...(req.user ?? {}),
                roles: roles,
            };
        }

        next();
    }
}
