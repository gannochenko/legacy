import { IsString, IsOptional } from 'class-validator';

// https://github.com/typestack/class-validator

export class CreateBuildDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;
}
