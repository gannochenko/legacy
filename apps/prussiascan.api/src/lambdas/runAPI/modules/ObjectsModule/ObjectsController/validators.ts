import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { HeritageObjectLocationType } from '../../../entities/ObjectEntity/type';
import { FileQuotaType, MimeType } from '../type';

@ValidatorConstraint({ name: 'locations', async: false })
export class LocationsValidatorConstraint
    implements ValidatorConstraintInterface
{
    validate(input: [unknown, unknown][], args: ValidationArguments) {
        if (!Array.isArray(input)) {
            return false;
        }

        for (let i = 0; i < input.length; i++) {
            const item = input[i] as unknown as HeritageObjectLocationType;

            if (!item.lat || !item.lng) {
                return false;
            }

            if (
                Number.isNaN(parseFloat(item.lat as unknown as string)) ||
                Number.isNaN(parseFloat(item.lng as unknown as string))
            ) {
                return false;
            }
        }

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        // here you can provide default error message if validation failed
        return 'location should be an array of objects';
    }
}

@ValidatorConstraint({ name: 'fileQuota', async: false })
export class FileQuotaValidator implements ValidatorConstraintInterface {
    private count = 0;

    validate(input: FileQuotaType, args: ValidationArguments) {
        const keys = Object.keys(input ?? {}) as MimeType[];

        if (!keys.length) {
            return false;
        }

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = input[key];

            if (key !== MimeType.jpg && key !== MimeType.png) {
                return false;
            }
            if (Number.isNaN(Number(value))) {
                return false;
            }

            this.count += Number(value);
        }

        if (this.count > 10) {
            return false;
        }

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        if (this.count > 10) {
            return 'Maximum 10 url can be requested';
        }

        return 'fileQuota should be an array of objects';
    }
}
