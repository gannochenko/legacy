import * as yup from 'yup';
import { getVaultFor } from './vault';
import { StringMap } from './type';

export const getValidator = (dto: Function, depth = 1): object => {
    if (depth > 30) {
        return null;
    }

    const vault = getVaultFor(dto);

    if (!vault || !vault.isDTO) {
        return null;
    }

    let result = yup.object();

    const { attributes } = vault;
    if (!_.ione(attributes)) {
        return result;
    }

    Object.keys(attributes as StringMap).forEach((attributeName: string) => {
        const {
            params: { required, type },
            value,
        } = attributes[attributeName];
        const shape = {};

        let subType = null;
        if (_.isFunction(value)) {
            subType = getValidator(value, depth + 1);
        } else {
            // only basic stuff so far

            // todo: support arrays
            if (type === 'string') {
                subType = yup.string();
            } else if (type === 'number') {
                subType = yup.number();
            } else if (type === 'boolean') {
                subType = yup.boolean();
            } else {
                subType = yup.string();
            }
        }

        if (subType === null) {
            throw new Error(`No DTO found for "${attributeName}" attribute`);
        }

        if (required) {
            subType = subType.required();
        }

        // todo: show "path" here
        subType = subType.typeError(
            `Member "${attributeName}" should be of type "${type}"`,
        );

        shape[attributeName] = subType;

        result = result.shape(shape);
    });

    return result;
};

export const truncateStructure = (
    structure: StringMap,
    dto: Function,
    depth = 1,
): StringMap => {
    if (depth > 30) {
        return {};
    }

    const vault = getVaultFor(dto);

    if (!vault || !vault.isDTO) {
        return {};
    }

    const { attributes } = vault;
    if (!_.ione(attributes)) {
        return {};
    }

    // todo
};
