import {
    IsString,
    IsNumber,
    IsOptional,
    IsBoolean,
    Min,
    MinLength,
    IsIn,
} from 'class-validator';
import {
    ObjectConditionEnum,
    ObjectKindEnum,
    ObjectMaterialEnum,
} from '../../entities/ObjectEntity/enums';

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
    yearBuilt: number;

    @IsString()
    @IsOptional()
    periodBuilt: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    yearDemolished: number;

    @IsString()
    @IsOptional()
    periodDemolished: string;

    @IsBoolean()
    demolished: boolean;

    @IsIn(Object.values(ObjectConditionEnum))
    condition: ObjectConditionEnum;

    @IsNumber()
    @Min(0)
    locationLat: number;

    @IsNumber()
    @Min(0)
    locationLong: number;

    @IsIn(Object.values(ObjectMaterialEnum), { each: true })
    materials: ObjectMaterialEnum[];

    @IsIn(Object.values(ObjectKindEnum), { each: true })
    kind: ObjectKindEnum[];
}

export class UpdateObjectDto {}

export class FindObjectDto {
    @IsNumber()
    @IsOptional()
    limit: number;
}
