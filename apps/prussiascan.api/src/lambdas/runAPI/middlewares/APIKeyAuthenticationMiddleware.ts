import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserRoleEnum } from '../entities';
import { UserRequestData } from './type';

export class APIKeyAuthenticationMiddleware implements NestMiddleware {
    use(
        req: Request & { user?: UserRequestData },
        res: Response,
        next: NextFunction,
    ) {
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
