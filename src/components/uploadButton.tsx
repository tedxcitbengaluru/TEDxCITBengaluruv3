import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { appConstants } from '@/utils/appConstants';
import { UploadFileService } from '@/utils/storage/uploadFile';
import { cn } from '@/lib/utils';

export const UploadButton: React.FC<{
    multiple?: boolean;
    label?: string;
    container?: string;
    id?: string;
    name?: string;
    onSuccess?: (input: { id: number }) => Promise<void>;
    className?: string;
}> = (config) => {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setSelectedFiles([...selectedFiles, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };

    const handleUpload: MouseEventHandler<HTMLButtonElement> = async () => {
        if (selectedFiles.length === 0) {
            toast.warning('No files selected!');
            return;
        }

        setIsUploading(true);

        try {
            await Promise.all(
                selectedFiles.map(async (file) => {
                    try {
                        const uploadResult = await UploadFileService(file, {
                            bucketName: appConstants.NEXT_PUBLIC_SUPABASE_BUCKET_NAME,
                            container: config.container ?? 'default'
                        });
                        if (config.onSuccess) await config.onSuccess(uploadResult);
                        toast.success(`File ${file.name} uploaded`);
                    } catch (error) {
                        toast.error(`File upload failed: ${file.name}`);
                        console.log(error);
                    }
                })
            );
        } catch (error) {
            console.error('Error uploading files:', error);
        } finally {
            setIsUploading(false);
            setSelectedFiles([]);
        }
    };

    const handleDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const newFiles = event.dataTransfer?.files;
        if (!newFiles) return;

        const mergedFiles = Array.from(newFiles).filter(
            (file) => !selectedFiles.some((selectedFile) => selectedFile.name === file.name)
        );

        setSelectedFiles([...selectedFiles, ...mergedFiles]);
    };

    return (
        <div className={cn('upload-container', config.className)}>
            <div className="upload-dropzone" onDragOver={handleDragOver} onDrop={handleDrop}>
                <label htmlFor="upload-input" className="upload-label">
                    <input
                        ref={inputRef}
                        disabled={isUploading}
                        id="upload-input"
                        name={config.name}
                        type="file"
                        multiple={config.multiple}
                        className="upload-input"
                        onChange={handleFileChange}
                    />
                    <div className="upload-icon">
                        <i className="fas fa-cloud-upload-alt"></i>
                    </div>
                    <div className="upload-text">
                        <strong>{config.label ?? 'Upload'}</strong> or drag and drop files here
                    </div>
                </label>
            </div>
            <Button variant="outline" onClick={handleUpload} disabled={isUploading}>
                Upload
            </Button>
            {selectedFiles.length > 0 && (
                <div>
                    <p>Selected files:</p>
                    <ul>
                        {selectedFiles.map((file, index) => (
                            <li key={index}>
                                {file.name}{' '}
                                <button type="button" onClick={() => removeFile(index)} className="remove-button">
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
