import { SelectedFileType } from '../type';

export const convertFileToBase64 = (file: File): Promise<SelectedFileType> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = {
                file,
                preview: reader.result?.toString() || '',
            };
            resolve(result);
        };
        reader.onerror = (error) => reject(error);
    });
};
