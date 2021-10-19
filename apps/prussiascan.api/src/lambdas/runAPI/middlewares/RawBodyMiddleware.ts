import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { raw } from 'body-parser';

/**
 * Copied this middleware to parse the raw response into a param to use later
 * from https://github.com/golevelup/nestjs/blob/master/packages/webhooks/src/webhooks.middleware.ts
 */
@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
    public use(req: Request, res: Response, next: NextFunction): any {
        raw({
            type: '*/*',
            limit: '5mb',
        })(req, res, next);
    }
}
