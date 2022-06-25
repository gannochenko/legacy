import {
    IsString,
    IsNumber,
    IsOptional,
    IsBoolean,
    Min,
    MinLength,
    IsIn,
    Max,
    IsUUID,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    Validate,
} from 'class-validator';
import {
    ObjectConditionEnum,
    ObjectHeritageLevelEnum,
    ObjectHeritageStatusEnum,
    ObjectKindEnum,
    ObjectLocationAreaEnum,
    ObjectMaterialEnum,
} from '../../../entities/ObjectEntity/enums';
import { FileQuotaType, MimeType } from '../type';
import { HeritageObjectLocationType } from '../../../entities/ObjectEntity/type';
import { FileQuotaValidator, LocationsValidatorConstraint } from './validators';

// https://github.com/typestack/class-validator

export class CreateObjectDto {
    @IsString()
    @MinLength(10, {
        message: 'Name is too short',
    })
    name: string;

    @IsString()
    @IsOptional()
    nameDe: string;

    @IsString()
    content: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    constructionYearStart: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    constructionYearEnd: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    lossYearStart: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    lossYearEnd: number;

    @IsBoolean()
    @IsOptional()
    lost: boolean;

    @IsBoolean()
    @IsOptional()
    altered: boolean;

    @IsIn(Object.values(ObjectConditionEnum))
    @IsOptional()
    condition: ObjectConditionEnum;

    @Validate(LocationsValidatorConstraint)
    location: { lat: number; lng: number }[];

    @IsString()
    @IsOptional()
    locationDescription: string;

    @IsIn(Object.values(ObjectLocationAreaEnum))
    @IsOptional()
    locationArea: ObjectLocationAreaEnum;

    @IsIn(Object.values(ObjectMaterialEnum), { each: true })
    @IsOptional()
    materials: ObjectMaterialEnum[];

    @IsIn(Object.values(ObjectKindEnum), { each: true })
    @IsOptional()
    kind: ObjectKindEnum[];

    @IsString()
    @IsOptional()
    heritageId: string;

    @IsIn(Object.values(ObjectHeritageStatusEnum))
    @IsOptional()
    heritageStatus: ObjectHeritageStatusEnum;

    @IsIn(Object.values(ObjectHeritageLevelEnum))
    @IsOptional()
    heritageLevel: ObjectHeritageLevelEnum;

    @IsString({ each: true })
    @IsOptional()
    architects: string[];
}

export class UpdateObjectDto {}

export class FindObjectDto {
    @IsString()
    @IsOptional()
    @Max(50)
    limit: number;

    @IsString()
    @IsOptional()
    lastId: string;
}

export class GetUploadURLDto {
    @IsUUID()
    objectId: string;

    @Validate(FileQuotaValidator)
    fileQuota: FileQuotaType;
}

export class AttachFileDto {
    @IsUUID()
    objectId: string;

    @IsUUID()
    fileId: string;

    @IsString()
    code: string;

    @IsIn([MimeType.jpg, MimeType.png])
    fileMime: MimeType;

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
