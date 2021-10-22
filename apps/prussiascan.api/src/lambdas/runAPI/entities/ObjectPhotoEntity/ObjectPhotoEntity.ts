export class ObjectPhotoEntity {
    variants: Record<string, string>;
    author?: string;
    source?: string;
    uploadedAt: string;
    capturedAt?: string;
    capturedYearStart?: number;
    capturedYearEnd?: number;
}
