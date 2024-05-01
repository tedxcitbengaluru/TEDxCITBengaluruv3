import { v4 as uuidv4 } from 'uuid';
import { GetFileBaseUrl } from './getFileBaseUrl';
import { staticSupabaseClient } from '../staticSupabaseClient';

function imageSize(url: string) {
    const img = document.createElement('img');

    const promise = new Promise<{ width: number; height: number }>((resolve, reject) => {
        img.onload = () => {
            // Natural size is the actual image size regardless of rendering.
            // The 'normal' `width`/`height` are for the **rendered** size.
            const width = img.naturalWidth;
            const height = img.naturalHeight;

            // Resolve promise with the width and height
            resolve({ width, height });
        };

        // Reject promise on error
        img.onerror = reject;
    });

    // Setting the source makes it start downloading and eventually call `onload`
    img.src = url;

    return promise;
}

const allowedPPTTypes: string[] = [
    // 'vnd.ms-powerpoint',
    // 'vnd.ms-powerpoint',
    // 'vnd.ms-powerpoint',
    // 'vnd.ms-powerpoint',
    // 'vnd.openxmlformats-officedocument.presentationml.presentation',
    // 'vnd.openxmlformats-officedocument.presentationml.template',
    // 'vnd.openxmlformats-officedocument.presentationml.slideshow',
    // 'vnd.ms-powerpoint.addin.macroEnabled.12',
    // 'vnd.ms-powerpoint.presentation.macroEnabled.12',
    // 'vnd.ms-powerpoint.template.macroEnabled.12',
    // 'vnd.ms-powerpoint.slideshow.macroEnabled.12'
];

const allowedImageTypes: string[] = ['image'];
const allowedVideoTypes: string[] = ['video'];
const allowedAudioTypes: string[] = []; // ['audio'];
const allowedPdfTypes: string[] = []; // ['pdf'];

export const UploadFileService = async (
    file: File,
    config: {
        bucketName: string;
        container: string;
    }
) => {
    const typeStr = file.type.split('/')[0];
    const typeStrSuffix = file.type.split('/')[1];
    const type: string | null = allowedImageTypes.includes(typeStr)
        ? 'IMAGE'
        : allowedVideoTypes.includes(typeStr)
        ? 'VIDEO'
        : null;

    if (type === null) {
        throw 'File type not allowed';
    }

    const fileUploadResult = await staticSupabaseClient.storage
        .from(config.bucketName)
        .upload(config.container + '/' + uuidv4(), file);

    if (!fileUploadResult.data) {
        console.error(fileUploadResult.error);
        throw 'Server Upload Failed';
    }
    try {
        const dimensions =
            type === 'IMAGE'
                ? await imageSize(GetFileBaseUrl(config.bucketName, fileUploadResult.data.path))
                : undefined;

        const mediaQueryOutput = await staticSupabaseClient
            .from('Media')
            .insert({
                type,
                path: fileUploadResult.data.path,
                metadata: {
                    size: file.size,
                    name: file.name,
                    mime: file.type,
                    dimensions
                },
                bucketName: config.bucketName
            })
            .select('id')
            .single();

        if (mediaQueryOutput.data === null) {
            throw `couldn't upload!`;
        }
        return mediaQueryOutput.data;
    } catch (error) {
        await staticSupabaseClient.storage
            .from(config.bucketName)
            .remove([fileUploadResult.data.path]);

        console.log('Upload Failed: ', error);
        throw error;
    }
};
