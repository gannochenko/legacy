export class ObjectPhotoEntity {
    variants: Record<string, string>;
    code: string;
    author?: string;
    source?: string;
    uploadedAt: string;
    capturedAt?: string;
    capturedYearStart?: number;
    capturedYearEnd?: number;
    header?: boolean;
    preview?: boolean;
}
