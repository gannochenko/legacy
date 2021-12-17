import { NestMiddleware } from '@nestjs/common';
import * as jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { getConnection } from 'typeorm';
import { UserEntity } from '../entities/UserEntity/UserEntity';

export class Auth0AuthenticationMiddleware implements NestMiddleware {
    use(req, res, next) {
        const domain = process.env.AUTH0_DOMAIN;
        const audience = process.env.AUTH0_AUDIENCE;

        // https://auth0.com/blog/json-web-token-signing-algorithms-overview/
        jwt({
            secret: expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `https://${domain}.auth0.com/.well-known/jwks.json`,
            }),
            audience: audience, // https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3
            issuer: `https://${domain}.auth0.com/`, // https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.1
            algorithms: ['RS256'],
        })(req, res, (err) => {
            if (err) {
                const status = err.status || 500;
                const message = err.message || 'Unable to process the request.';
                return res.status(status).send({
                    message,
                });
            }

            (async () => {
                let roles: string[] = [];
                const userId = req.user.sub as string;

                const connection = await getConnection('default');
                const userRepository = connection.getRepository(UserEntity);
                const user = await userRepository.findOne({
                    where: {
                        externalId: userId,
                    },
                    select: ['id'],
                    relations: ['roles'],
                });
                if (user && user.roles) {
                    roles = user.roles.map((role) => role.code);
                }

                req.user.roles = roles;
            })()
                .then(() => next())
                .catch((e) => {
                    // console.error(e);
                    res.status(500).send({
                        message: '',
                    });
                });
        });
    }
}
