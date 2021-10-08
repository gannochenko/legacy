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

    @IsOptional()
    @IsString()
    author: string;

    @IsOptional()
    @IsString()
    source: string;

    @IsOptional()
    @IsString()
    capturedAt: string;

    @IsOptional()
    @IsString()
    capturedYearStart: number;

    @IsOptional()
    @IsString()
    capturedYearEnd: number;
}
