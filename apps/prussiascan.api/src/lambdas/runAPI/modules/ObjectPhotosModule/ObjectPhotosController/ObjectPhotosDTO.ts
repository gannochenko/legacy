import { IsString, IsOptional, IsUUID } from 'class-validator';

// https://github.com/typestack/class-validator

export class UploadObjectPhotoDto {
    @IsUUID()
    objectId: string;

    @IsString()
    @IsOptional()
    year: number;

    @IsString()
    @IsOptional()
    period: string;
}
