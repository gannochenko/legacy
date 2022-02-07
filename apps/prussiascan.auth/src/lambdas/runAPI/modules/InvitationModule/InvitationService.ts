import { Injectable, HttpException } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { compile } from 'pug';
import { JwtService } from '@nestjs/jwt';

import { awsOptions } from '../../utils/awsOptions';
import {
    InviteInputType,
    JoinInputType,
    InviteOutputType,
    JoinOutputType,
} from './type';
import { tryExecute } from '../../utils/tryExecute';
import { invitationMessageTemplate } from './invitationMessageTemplate';
import { sendMessage } from './sendMessage';
import { UserService } from './UserService';

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const dynamoDB = new DynamoDB.DocumentClient({
    ...awsOptions,
    apiVersion: '2012-08-10',
});
const TABLE_NAME = process.env.AWS_INVITATION_TOKENS_TABLE_NAME ?? '';

const randomBytesAsync = promisify(randomBytes);

const compiledFunction = compile(invitationMessageTemplate);

@Injectable()
export class InvitationService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    public async invite(item: InviteInputType): Promise<InviteOutputType> {
        const { email, role } = item;

        // check if already invited
        const invitation = await this.getInvitation(email);
        if (invitation?.Item) {
            throw new HttpException('User already invited', 409);
        }

        const token = (await randomBytesAsync(48)).toString('hex');

        const dynamodbItem = {
            email,
            token,
            role: role ?? '',
            createdAt: new Date().toISOString(),
        };

        await tryExecute(async () => {
            return await dynamoDB
                .put({
                    TableName: TABLE_NAME,
                    Item: dynamodbItem,
                })
                .promise();
        }, 'Could not create an invitation');

        await this.sendInvitationMessage(email, token);

        return { data: dynamodbItem };
    }

    public async join(item: JoinInputType): Promise<JoinOutputType> {
        const { token, email } = item;

        const invitation = await this.getInvitation(email);
        if (!invitation?.Item) {
            throw new HttpException('You were not invited', 400);
        }

        const { token: storedToken, role } = invitation?.Item;

        let userId = '';
        const user = await this.userService.getByEmail(email);
        if (user) {
            // authenticate, but only if the token is right
            if (storedToken === token) {
                userId = user.id;
            } else {
                throw new HttpException('Token is not right', 403);
            }
        } else {
            // create and authenticate
            const { data: newUser } = await this.userService.create({
                email,
                roles: role ? [role] : [],
            });
            userId = newUser.id;
        }

        return {
            data: {
                token: await this.jwtService.signAsync(
                    {
                        userId,
                    },
                    {
                        expiresIn: '7 days',
                        audience: `https://${process.env.DOMAIN}`,
                    },
                ),
            },
        };
    }

    private async getInvitation(email: string) {
        return await tryExecute(async () => {
            return await dynamoDB
                .get({
                    TableName: TABLE_NAME,
                    Key: {
                        email,
                    },
                })
                .promise();
        }, 'Could not get the invitation');
    }

    private async sendInvitationMessage(email: string, token: string) {
        return sendMessage(
            email,
            'New message from "Архитектурный Архив"',
            compiledFunction({
                invitationLink: `https://${
                    process.env.WEBAPP_DOMAIN
                }/join?token=${encodeURIComponent(
                    token,
                )}&email=${encodeURIComponent(email)}`,
            }),
        );
    }
}
