const normalizePhotos = (photos) => {
    if (!photos) {
        return [];
    }

    return photos.map(photo => {
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
        };
    });
};

module.exports = {
    normalizeHeritageObject: (element) => {
        return {
            id: element.id ?? '',
            slug: element.slug ?? '',
            name: element.name ?? '',
            content: element.content ?? '',
            yearBuiltStart: element.yearBuiltStart ?? 0,
            yearBuiltEnd: element.yearBuiltEnd ?? 0,
            yearDemolishedStart: element.yearDemolishedStart ?? 0,
            yearDemolishedEnd: element.yearDemolishedEnd ?? 0,
            demolished: element.demolished ?? false,
            condition: element.condition ?? '',
            locationLat: element.locationLat ?? 0,
            locationLong: element.locationLong ?? 0,
            materials: element.materials ?? [],
            kind: element.kind ?? [],
            createdAt: element.createdAt ?? '',
            updatedAt: element.updatedAt ?? '',
            photos: normalizePhotos(element.photos ?? []),
            version: element.version ?? 1,
            internal: element.internal,
        };
    }
};
