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
        };
    });
};

module.exports = {
    normalizeHeritageObject: (element) => {
        return {
            bitch: '1',
            id: element.id ?? '',
            slug: element.slug ?? '',
            name: element.name ?? '',
            content: element.content ?? '',
            constructionYearStart: element.constructionYearStart ?? 0,
            constructionYearEnd: element.constructionYearEnd ?? 0,
            lossYearStart: element.lossYearStart ?? 0,
            lossYearEnd: element.lossYearEnd ?? 0,
            lost: element.lost ?? false,
            altered: element.altered ?? false,
            condition: element.condition ?? '',
            location: element.location ?? [],
            locationDescription: element.locationDescription ?? '',
            locationArea: element.locationArea ?? '',
            materials: element.materials ?? [],
            kind: element.kind ?? [],
            createdAt: element.createdAt ?? '',
            updatedAt: element.updatedAt ?? '',
            photos: normalizePhotos(element.photos ?? []),
            previewPhoto: element.previewPhoto ?? '',
            heritageId: element.heritageId ?? '',
            heritageLevel: element.heritageLevel ?? '',
            heritageStatus: element.heritageStatus ?? '',
            version: element.version ?? 1,
        };
    },
};
