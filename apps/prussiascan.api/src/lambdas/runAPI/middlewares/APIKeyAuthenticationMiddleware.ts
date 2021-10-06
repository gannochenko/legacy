import { NestMiddleware } from '@nestjs/common';
import { UserRoleEnum } from '../entities/UserEntity/enums';

export class APIKeyAuthenticationMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const key = req.headers['x-api-key'] || '';
        if (key === process.env.CONTRIBUTOR_API_KEY) {
            req.user = {
                ...(req.user ?? {}),
                roles: [UserRoleEnum.contributor],
            };
        }

        next();
    }
}
