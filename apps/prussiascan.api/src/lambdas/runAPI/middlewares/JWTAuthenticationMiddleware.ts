import { InternalServerErrorException, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Lambda } from 'aws-sdk';
import { UserEntity } from '../entities';
import { awsOptions } from '../utils/awsOptions';
import { UserRequestData } from './type';

const lambda = new Lambda({
    ...awsOptions,
    // apiVersion: '2012-08-10',
});

export class JWTAuthenticationMiddleware implements NestMiddleware {
    use(
        req: Request & { user?: UserRequestData },
        res: Response,
        next: NextFunction,
    ) {
        const token = req.headers['token'] || '';
        if (!token) {
            next();
            return;
        }

        if (__DEV__) {
            import('node-fetch').then(({ default: fetch }) =>
                fetch(`${process.env.AUTH_URL}dev/user`, {
                    method: 'POST',
                    body: JSON.stringify({
                        token,
                    }),
                })
                    .then((res: any) => res.json())
                    .then((res: any) => {
                        const data = res.data;
                        req.user = {
                            ...(req.user ?? {}),
                            id: data.id,
                            roles: data.attributes?.roles,
                        };
                        next();
                    }),
            );
        }

        if (!__DEV__ && process.env.AWS_AUTH_GETUSER_LAMBDA_NAME) {
            const params = {
                FunctionName: process.env.AWS_AUTH_GETUSER_LAMBDA_NAME,
                InvocationType: 'RequestResponse',
                LogType: 'Tail',
                Payload: JSON.stringify({
                    token,
                }),
            };

            lambda.invoke(params, function (error, data) {
                if (error) {
                    throw new InternalServerErrorException(
                        'Could not call the getUser lambda',
                    );
                } else {
                    const Payload = data.Payload as {
                        id: string;
                        attributes: UserEntity;
                    };
                    const { id } = Payload;
                    const roles = Payload.attributes?.roles ?? [];
                    if (id && roles.length) {
                        req.user = {
                            ...(req.user ?? {}),
                            id,
                            roles,
                        };
                    }

                    next();
                }
            });
        }
    }
}
