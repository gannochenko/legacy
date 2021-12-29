const normalizePhotos = (photos) => {
    if (!photos) {
        return [];
    }

    return photos.map((photo) => {
        return {
            variants: {
                normalized: '',
                original: '',
                ...photo.variants,
            },
            code: photo.code ?? '',
            author: photo.author ?? '',
            source: photo.source ?? '',
            uploadedAt: photo.uploadedAt ?? '',
            capturedAt: photo.capturedAt ?? '',
            capturedYearStart: photo.capturedYearStart ?? 0,
            capturedYearEnd: photo.capturedYearEnd ?? 0,
            header: photo.header ?? false,
            preview: photo.preview ?? false,
        };
    });
};

const ensureNumber = (value, field, item) => {
    if (typeof value === 'string' || isNaN(parseInt(value, 10))) {
        console.warn(
            `An item "${item.slug}" has string at "${field}": "${value}"`,
        );
        return 0;
    }

    return value;
};

const ensureArrayOfNumbers = (value, field, item) => {
    if (!value || !Array.isArray(value)) {
        return [];
    }

    return value.map((element, index) =>
        ensureNumber(item, `${field}[${index}]`, element),
    );
};

module.exports = {
    normalizeHeritageObject: (element) => {
        if (!element.slug || element.slug === 'undefined') {
            return null;
        }

        return {
            id: element.id ?? '',
            slug: element.slug ?? '',
            name: element.name ?? '',
            nameDe: element.nameDe ?? '',
            content: element.content ?? '',
            constructionYearStart: element.constructionYearStart ?? 0,
            constructionYearEnd: element.constructionYearEnd ?? 0,
            lossYearStart: element.lossYearStart ?? 0,
            lossYearEnd: element.lossYearEnd ?? 0,
            lost: element.lost ?? false,
            altered: element.altered ?? false,
            remarkable: element.remarkable ?? false,
            condition: ensureNumber(element.condition, 'condition', element),
            location: element.location ?? [],
            locationDescription: element.locationDescription ?? '',
            locationArea: ensureNumber(
                element.locationArea,
                'locationArea',
                element,
            ),
            materials: ensureArrayOfNumbers(
                element.materials,
                'materials',
                element,
            ),
            kind: ensureArrayOfNumbers(element.kind, 'kind', element),
            createdAt: element.createdAt ?? '',
            updatedAt: element.updatedAt ?? '',
            photos: normalizePhotos(element.photos ?? []),
            heritageId: element.heritageId ?? '',
            heritageLevel: ensureNumber(
                element.heritageLevel,
                'heritageLevel',
                element,
            ),
            heritageStatus: ensureNumber(
                element.heritageStatus,
                'heritageStatus',
                element,
            ),
            architects: element.architects ?? [],
            version: element.version ?? 1,
        };
    },
};
