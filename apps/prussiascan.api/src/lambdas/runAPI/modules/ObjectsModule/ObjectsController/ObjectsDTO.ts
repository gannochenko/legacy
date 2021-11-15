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
    MaxLength,
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
import { MimeType } from '../type';

// https://github.com/typestack/class-validator

@ValidatorConstraint({ name: 'locations', async: false })
export class LocationsValidatorConstraint
    implements ValidatorConstraintInterface
{
    validate(input: [unknown, unknown][], args: ValidationArguments) {
        if (!Array.isArray(input)) {
            return false;
        }

        for (let i = 0; i < input.length; i++) {
            const item = input[i];

            if (item.length !== 2) {
                return false;
            }

            if (
                Number.isNaN(parseFloat(item[0] as string)) ||
                Number.isNaN(parseFloat(item[1] as string))
            ) {
                return false;
            }
        }

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        // here you can provide default error message if validation failed
        return 'Locations should be an array of array of two numbers.';
    }
}

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

    @IsNumber()
    @MaxLength(2, {
        each: true,
    })
    @MinLength(2, {
        each: true,
    })
    @Validate(LocationsValidatorConstraint)
    location: [number, number][];

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

    @IsIn([MimeType.jpg, MimeType.png])
    fileMime: MimeType;
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
