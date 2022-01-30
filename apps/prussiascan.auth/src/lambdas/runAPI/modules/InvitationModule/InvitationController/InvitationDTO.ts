import { IsString, IsEmail, MinLength } from 'class-validator';

// https://github.com/typestack/class-validator

export class InviteDto {
    @IsEmail()
    email: string;
}

export class JoinDto {
    @IsString()
    @MinLength(1, {
        message: 'Token is too short',
    })
    token: string;

    @IsEmail()
    email: string;
}
