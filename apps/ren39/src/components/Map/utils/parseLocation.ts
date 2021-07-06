import { MapGeometryType } from '../type';

export const parseLocation = (location: string) => {
    if (!location) {
        return null;
    }

    return location
        .split(',')
        .map((coordinate) => parseFloat(coordinate.trim())) as MapGeometryType;
};
