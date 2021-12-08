export class ObjectPhotoEntity {
    id: string;
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
