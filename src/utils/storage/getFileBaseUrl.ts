import { appConstants } from '../appConstants';

export const GetFileBaseUrl = (bucketName: string, filepath: string) => {
    return (
        appConstants.NEXT_PUBLIC_SUPABASE_URL +
        '/storage/v1/object/public/' +
        bucketName +
        '/' +
        filepath
    );
};
