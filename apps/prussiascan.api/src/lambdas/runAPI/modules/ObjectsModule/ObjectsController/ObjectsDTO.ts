import {
    IsString,
    IsNumber,
    IsOptional,
    IsBoolean,
    Min,
    MinLength,
    IsIn,
    Max,
} from 'class-validator';
import {
    ObjectConditionEnum,
    ObjectKindEnum,
    ObjectMaterialEnum,
} from '../../../entities/ObjectEntity/enums';

// https://github.com/typestack/class-validator

export class CreateObjectDto {
    @IsString()
    @MinLength(10, {
        message: 'Name is too short',
    })
    name: string;

    @IsString()
    content: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    yearBuiltStart: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    yearBuiltEnd: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    yearDemolishedStart: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    yearDemolishedEnd: number;

    @IsBoolean()
    @IsOptional()
    demolished: boolean;

    @IsIn(Object.values(ObjectConditionEnum))
    @IsOptional()
    condition: ObjectConditionEnum;

    @IsNumber()
    @Min(0)
    locationLat: number;

    @IsNumber()
    @Min(0)
    locationLong: number;

    @IsIn(Object.values(ObjectMaterialEnum), { each: true })
    @IsOptional()
    materials: ObjectMaterialEnum[];

    @IsIn(Object.values(ObjectKindEnum), { each: true })
    @IsOptional()
    kind: ObjectKindEnum[];
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
